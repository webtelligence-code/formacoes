import React, { Fragment } from 'react'
import TopNav from '../components/ListTrainingPage/TopNav'
import TrainingData from '../components/RegisterTrainingPage/TrainingData'
import { useEffect } from 'react';
import chalk from 'chalk';
import { useCallback } from 'react';
import axios from 'axios';
import { useState } from 'react';

const RegisterTrainingPage = ({ setPage, API_URL }) => {
  const [title, setTitle] = useState('');
  const [brands, setBrands] = useState([]);
  const [location, setLocation] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [switchCheked, setSwitchChecked] = useState(false)

  /////////////////////////////////////////////////////////////////////////////////
  // REQUESTS
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

  useEffect(() => {
    // Fetch all brands when the component mounts
    fetchAllBrands();
    fetchAllCities();
  }, [fetchAllBrands, fetchAllCities]);

  return (
    <Fragment>
      <TopNav title={'Registar Formação'} showFilters={false} setPage={setPage} buttonText={'Voltar'} />
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
        switchCheked={switchCheked}
        setSwitchChecked={setSwitchChecked}
      />
    </Fragment>
  )
}

export default RegisterTrainingPage