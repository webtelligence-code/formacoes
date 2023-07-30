import React, { Fragment } from 'react'
import TrainingData from '../components/RegisterTrainingPage/TrainingData'
import TrainingCollaborators from '../components/RegisterTrainingPage/TrainingCollaborators'
import TrainingDescription from '../components/RegisterTrainingPage/TrainingDescription'
import { useEffect } from 'react';
import chalk from 'chalk';
import { useCallback } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button, message, Popconfirm } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import unorm from 'unorm'

const RegisterTrainingPage = ({ sessionUsername, API_URL, setPage }) => {
  // Lists
  const [brandsList, setBrandsList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  // Switches
  const [switchDateCheked, setSwitchDateChecked] = useState(false)
  const [switchCollaboratorsChecked, setSwitchCollaboratorsChecked] = useState(false)

  // Selected States
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState(null);
  const [location, setLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [description, setDescription] = useState('');

  // Loading State
  const [loading, setLoading] = useState(false)

  /////////////////////////////////////////////////////////////////////////////////
  // REQUEST FUNCTIONS FOR REGISTER TRAINING PAGE
  ////////////////////////////////////////////////////////////////////////////////
  const fetchAllBrands = useCallback(() => {
    axios
      .get(API_URL, {
        params: {
          action: 'get_all_brands',
        },
      })
      .then((response) => {
        console.log(chalk.green('Fetched All Brands ->'), response.data);
        const brandsFromApi = response.data;
        const sortedBrands = brandsFromApi.sort((a, b) => a.localeCompare(b));

        // Group brands y the first character of their names
        const groupedBrands = sortedBrands.reduce((acc, brand) => {
          const firstChar = brand.charAt(0).toUpperCase();
          if (!acc[firstChar]) {
            acc[firstChar] = [];
          }
          acc[firstChar].push(brand);
          return acc;
        }, {})

        const formattedBrands = Object.entries(groupedBrands).map(([letter, brands]) => ({
          label: letter,
          options: brands.map((brand) => ({
            value: brand,
            label: brand,
          })),
        }))

        setBrandsList(formattedBrands);
      })
      .catch((error) => {
        console.log(chalk.red('Failed fetching all Brands...'), error);
      });
  }, [API_URL]);

  const fetchAllCities = useCallback(() => {
    axios
      .get(API_URL, {
        params: {
          action: 'get_all_cities',
        },
      })
      .then((response) => {
        console.log(chalk.green('Fetched All Cities ->'), response.data);
        // Response data from API
        const citiesFromApi = response.data;
        const onlineAndLisboa = ['Online', 'Lisboa']; // External required options

        // Group 'Online' and 'Lisboa' together
        const onlineAndLisboaCities = citiesFromApi.filter((city) =>
          onlineAndLisboa.includes(city)
        );

        // Group company concession cities
        const otherCities = citiesFromApi.filter(
          (city) => !onlineAndLisboa.includes(city)
        );

        // Format cities by grouping them together respectfully
        const formattedCities = [
          {
            label: 'Online and Lisboa',
            options: onlineAndLisboaCities.map((city) => ({
              value: city,
              label: city,
            })),
          },
          {
            label: 'Other Cities',
            options: otherCities.map((city) => ({
              value: city,
              label: city,
            })),
          },
        ];

        // Assign formatted cities to cities list
        setCitiesList(formattedCities);
      })
      .catch((error) => {
        console.log(chalk.red('Failed fetching all Cities...'), error);
      });
  }, [API_URL]);

  // Function to fetch all users from API
  const fetchAllUsers = useCallback(() => {
    axios
      .get(API_URL, {
        params: {
          action: 'get_all_users',
        },
      })
      .then((response) => {
        console.log(chalk.green('Users fetched ->'), response.data);
        const usersFromApi = response.data;

        // Sort users based on name using the unorm library for normalization
        const sortedUsers = usersFromApi.sort((a, b) =>
          unorm.nfkd(a.nameDisplay).localeCompare(unorm.nfkd(b.nameDisplay))
        );

        // Group users by the first character of their names
        const groupedUsers = sortedUsers.reduce((acc, user) => {
          const firstChar = unorm.nfkd(user.nameDisplay).charAt(0).toUpperCase();
          if (!acc[firstChar]) {
            acc[firstChar] = [];
          }
          acc[firstChar].push(user);
          return acc;
        }, {});

        // Format users
        const formattedUsers = Object.entries(groupedUsers).map(
          ([letter, users]) => ({
            label: letter,
            options: users.map((user) => ({
              value: user.username,
              label: user.nameDisplay,
            })),
          })
        );

        // Set formatted users to users list
        setUsersList(formattedUsers);
      })
      .catch((error) => {
        console.log(chalk.red('Error fetching users ->'), error);
      });
  }, [API_URL]);

  // useEffect controller to call API functions when component is loaded
  useEffect(() => {
    // Fetch all brands when the component mounts
    fetchAllBrands();
    fetchAllCities();
    fetchAllUsers();
  }, [fetchAllBrands, fetchAllCities, fetchAllUsers]);

  /////////////////////////////////////////////////////////////////////////////////
  // INTERACT FUNCTIONS FOR REGISTER TRAINING PAGE
  ////////////////////////////////////////////////////////////////////////////////

  const confirm = (e) => {
    console.log(chalk.cyan(e));
    submitTraining();
  }

  const cancel = (e) => {
    console.log(chalk.cyan(e));
    message.error('Ação cancelada');
  }

  useEffect(() => {
    if (switchCollaboratorsChecked) setSelectedUsers(usersList.map(user => user.value))
    else setSelectedUsers([])
  }, [switchCollaboratorsChecked, usersList])

  // This function will submit the training form data to the API
  const submitTraining = async () => {
    setLoading(true);
    // Convert selectedDate and selectedTime to datetime format using moment library
    const datetimeLimit = moment(selectedDate).set({
      hour: selectedTime?.hour(),
      minute: selectedTime?.minute(),
      second: 0,
      millisecond: 0,
    });

    const formattedDatetimeLimit = datetimeLimit.format('YYYY-MM-DD HH:mm:ss');

    // Set portal based
    const portal = brand === '' ? 'A MatosCar' : 'Marca';

    // Current datetime
    const currentDatetime = moment().toISOString();
    const formattedDatetime = moment(currentDatetime).format('YYYY-MM-DD HH:mm:ss');

    const action = 'insert_training';
    const formData = new FormData();

    // Training object 
    const training = {
      dateCreated: formattedDatetime,
      dateUpdated: formattedDatetime,
      dateLimit: formattedDatetimeLimit, // Convert the moment object to a string
      title,
      brand,
      location,
      description,
      isFinished: 0,
      portal,
      image: null,
      filePath: null,
      usernameCreated: sessionUsername,
      usernameUpdated: sessionUsername,
    }

    // Object for training collaborators
    const trainingCollaborators = {
      collaborators: selectedUsers,
      isAll: 0,
      certificateFilePath: null,
      certificateDate: null,
      dateOpened: null,
      finishedDate: null
    }

    formData.append('action', action);
    formData.append('training', JSON.stringify(training));
    formData.append('trainingCollaborators', JSON.stringify(trainingCollaborators));

    console.log(chalk.green('Training Object ->'), training)
    console.log(chalk.green('Training Collaborators Object ->'), trainingCollaborators)

    // Send POST request to the API
    axios.post(API_URL, formData)
      .then((response) => {
        if (response.data.status === 'Success') {
          setLoading(false);
          message.success('Formação registada com sucesso!');
        } else {
          setLoading(false);
          message.error('Ocurreu um erro inesperado!').then(() => {
            setPage('List')
          });
        }
        console.log(chalk.green('Response from register training request:'), response.data)
      })
      .catch((error) => {
        setLoading(false);
        console.log(chalk.red('Failed to send POST request for register training ->'), error)
      })
  }

  useEffect(() => {
    
  }, [selectedUsers])

  return (
    <Fragment>
      <Row>
        {/* Left side form (Training Data) */}
        <Col>

          {/* Main data component */}
          <TrainingData
            API_URL={API_URL}
            title={title}
            setTitle={setTitle}
            brandsList={brandsList}
            setBrand={setBrand}
            location={location}
            setLocation={setLocation}
            citiesList={citiesList}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            switchDateCheked={switchDateCheked}
            setSwitchDateChecked={setSwitchDateChecked}
          />
        </Col>

        {/* Right side form (Collaborators and Description) */}
        <Col>

          {/* Collaborators component */}
          <TrainingCollaborators
            switchCollaboratorsChecked={switchCollaboratorsChecked}
            setSwitchCollaboratorsChecked={setSwitchCollaboratorsChecked}
            usersList={usersList}
            setSelectedUsers={setSelectedUsers}
          />

          {/* Description component */}
          <TrainingDescription description={description} setDescription={setDescription} />

        </Col>

      </Row>

      {/* Button to register training (onClick Available soon) */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', marginTop: 10 }}>
        <Popconfirm
          title="Registar nova formação"
          description="Pretende continuar com esta ação?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Sim"
          cancelText="Ainda não"

        >
          <Button
            loading={loading}
            type='primary'
            style={{ backgroundColor: 'green' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            Registar
          </Button>
        </Popconfirm>
      </div>

    </Fragment>
  )
}

export default RegisterTrainingPage