import React, { Fragment } from 'react'
import TopNav from '../components/utility/TopNav'
import TrainingData from '../components/RegisterTrainingPage/TrainingData'
import TrainingCollaborators from '../components/RegisterTrainingPage/TrainingCollaborators'
import TrainingDescription from '../components/RegisterTrainingPage/TrainingDescription'
import { useEffect } from 'react';
import chalk from 'chalk';
import { useCallback } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

const RegisterTrainingPage = ({ setPage, API_URL }) => {
  const [title, setTitle] = useState('');
  const [brands, setBrands] = useState([]);
  const [location, setLocation] = useState('');
  const [cities, setCities] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [switchDateCheked, setSwitchDateChecked] = useState(false)
  const [switchCollaboratorsChecked, setSwitchCollaboratorsChecked] = useState(false)

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
        const formattedBrands = response.data.map((brand) => ({
          value: brand,
          label: brand,
        }));
        setBrands(formattedBrands);
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
        const formattedCities = response.data.map((city) => ({
          value: city,
          label: city,
        }));
        setCities(formattedCities);
      })
      .catch((error) => {
        console.log(chalk.red('Failed fetching all Cities...'), error);
      });
  }, [API_URL]);

  const fetchAllUsers = useCallback(() => {
    axios.get(API_URL, {
      params: {
        action: 'get_all_users',
      },
    })
      .then((response) => {
        console.log(chalk.green('Users fetched ->'), response.data);
        const formattedUsers = response.data.map((user) => ({
          value: user.username,
          label: user.nameDisplay,
        }));
        setUsers(formattedUsers)
      })
      .catch((error) => {
        console.log(chalk.red('Error fetching users ->'), error)
      })
  }, [API_URL])

  useEffect(() => {
    // Fetch all brands when the component mounts
    fetchAllBrands();
    fetchAllCities();
    fetchAllUsers();
  }, [fetchAllBrands, fetchAllCities, fetchAllUsers]);

  const submitTraining = async () => {
    
  }

  return (
    <Fragment>

      {/* Top Custom Navbar with props for Register Training Page */}
      <TopNav title={'Registar Formação'} showFilters={false} setPage={setPage} buttonText={'Voltar'} />

      <Row>
        {/* Left side form (Training Data) */}
        <Col>

          {/* Main data component */}
          <TrainingData
            API_URL={API_URL}
            title={title}
            setTitle={setTitle}
            brands={brands}
            location={location}
            setLocation={setLocation}
            cities={cities}
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
            users={users}
          />

          {/* Description component */}
          <TrainingDescription />

        </Col>

      </Row>

      {/* Button to register training (onClick Available soon) */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', marginTop: 10 }}>
        <Button type='primary' style={{ backgroundColor: 'green' }} onClick={() => { }} icon={<FontAwesomeIcon icon={faGraduationCap} />}>Registar</Button>
      </div>

    </Fragment>
  )
}

export default RegisterTrainingPage