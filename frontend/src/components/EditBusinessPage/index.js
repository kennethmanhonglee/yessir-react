import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

// add a thunk

const EditBusinessPage = () => {
    const { businessId } = useParams();
    const currentUser = useSelector((state) => state.session.user);
    const currentBusiness = useSelector((state) => state.businesses[businessId])
    const dispatch = useDispatch();
    const history = useHistory();


    const [title, setTitle] = useState(currentBusiness.title);
    const [description, setDescription] = useState(currentBusiness.description);
    const [address, setAddress] = useState(currentBusiness.address);
    const [city, setCity] = useState(currentBusiness.city);
    const [state, setState] = useState(currentBusiness.state);
    const [zipCode, setZipCode] = useState(currentBusiness.zipCode);
    const [latitude, setLatitude] = useState(currentBusiness.latitude);
    const [longitude, setLongitude] = useState(currentBusiness.longitude);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        validateBusiness();

        if (errors.legnth === 0) {
            const business = {
                ownerId: currentUser.id,
                title,
                description,
                address,
                city,
                state,
                zipCode,
                latitude,
                longitude
            };

            // call thunk to update business
            
        }
    };

    return (
        <>
            <h2>Edit your business</h2>
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
                    required
                ></input>
                <input
                    type='text'
                    placeholder='Description'
                    onChange={updateDescription}
                    value={description}
                    required
                ></input>
                <input
                    type='text'
                    placeholder='Street Address'
                    onChange={updateAddress}
                    value={address}
                    required
                ></input>
                <input
                    type='text'
                    placeholder='City'
                    onChange={updateCity}
                    value={city}
                    required
                ></input>
                <input
                    type='text'
                    placeholder='State'
                    onChange={updateState}
                    value={state}
                    required
                ></input>
                <input
                    type='text'
                    placeholder='Zip Code'
                    onChange={updateZipCode}
                    value={zipCode}
                    required
                ></input>
                <input
                    type='number'
                    placeholder='Latitude'
                    onChange={updateLatitude}
                    value={latitude}
                    required
                ></input>
                <input
                    type='number'
                    placeholder='Longitude'
                    onChange={updateLongitude}
                    value={longitude}
                    required
                ></input>
                <button type='submit'>Submit Changes</button>
            </form>
        </>
    )
};

export default EditBusinessPage;