import { useEffect, useState } from "react";

const CreateBusinessPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [errors, setErrors] = useState([]);

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateZipCode = (e) => setZipCode(e.target.value);
    const updateLatitude = (e) => setLatitude(e.target.value);
    const updateLongitude = (e) => setLongitude(e.target.value);

    const validateBusiness = () => {
        let newErrors = [];
        if (!title.length) newErrors.push('Title must not be empty.');
        if (!description.length) newErrors.push('Description must not be empty.');
        if (!address.length) newErrors.push('Street address must not be empty.');
        if (!city.length) newErrors.push('City must not be empty.');
        if (!state.length) newErrors.push('State must not be empty.');
        if (!zipCode.length) newErrors.push('Zip Code must not be empty.');
        if (!latitude) newErrors.push('Latitude must not be empty.');
        if (!longitude) newErrors.push('Longitude must not be empty.');

        setErrors(newErrors);
    }

    useEffect(validateBusiness, [title, description, address, city, state, zipCode, latitude, longitude]);

    const resetStates = () => {
        setTitle('');
        setDescription('');
        setAddress('');
        setCity('');
        setState('');
        setZipCode('');
        setLatitude(0);
        setLongitude(0);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        validateBusiness();
        if (errors.length === 0) {
            const newBusiness = {
                title,
                description,
                address,
                city,
                state,
                zipCode,
                latitude,
                longitude
            };

            // call thunk to create a business
            console.log(newBusiness); //placeholder

            resetStates();
        } else {
            console.log('something wrong dude')
        }

        console.log('FINISHED HANDLE SUBMIT!')
    }

    return (
        <>
            <h2>Create your own Business.</h2>
            {
                errors ?
                    errors.map((error) => <li key={error}>{error}</li>)
                    : null
            }

            <form
                onSubmit={handleSubmit}
            >
                <input
                    type='text'
                    placeholder='Title'
                    onChange={updateTitle}
                    value={title}
                ></input>
                <input
                    type='text'
                    placeholder='Description'
                    onChange={updateDescription}
                    value={description}
                ></input>
                <input
                    type='text'
                    placeholder='Street Address'
                    onChange={updateAddress}
                    value={address}
                ></input>
                <input
                    type='text'
                    placeholder='City'
                    onChange={updateCity}
                    value={city}
                ></input>
                <input
                    type='text'
                    placeholder='State'
                    onChange={updateState}
                    value={state}
                ></input>
                <input
                    type='text'
                    placeholder='Zip Code'
                    onChange={updateZipCode}
                    value={zipCode}
                ></input>
                <input
                    type='number'
                    placeholder='Latitude'
                    onChange={updateLatitude}
                    value={latitude}
                ></input>
                <input
                    type='number'
                    placeholder='Longitude'
                    onChange={updateLongitude}
                    value={longitude}
                ></input>
                <button type='submit'>Create a business</button>
            </form>
        </>
    )
};

export default CreateBusinessPage;