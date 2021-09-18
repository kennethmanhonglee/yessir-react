import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

import styles from "./EditBusinessPage.module.css";
import { editBusiness_thunk } from "../../store/businesses";

// add a thunk

const EditBusinessPage = () => {
  const { businessId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const currentBusiness = useSelector((state) => state.businesses[businessId]);
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errors, setErrors] = useState([]);

  // if not logged in, redirect to home page
  // if logged in but not the right user, redirect to home page

  if (
    currentUser &&
    currentBusiness &&
    currentBusiness.ownerId !== currentUser.id
  ) {
    return <Redirect to="/" />;
  }

  if (currentBusiness && !currentUser) {
    return <Redirect to="/" />;
  }

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateZipCode = (e) => setZipCode(e.target.value);

  const validateBusiness = () => {
    let newErrors = [];
    if (!title.length) newErrors.push("Title must not be empty.");
    if (!description.length) newErrors.push("Description must not be empty.");
    if (!address.length) newErrors.push("Street address must not be empty.");
    if (!city.length) newErrors.push("City must not be empty.");
    if (!state.length) newErrors.push("State must not be empty.");
    if (!zipCode.length) newErrors.push("Zip Code must not be empty.");

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateBusiness();

    if (errors.length === 0) {
      const business = {
        id: businessId,
        ownerId: currentUser.id,
        title,
        description,
        address,
        city,
        state,
        zipCode,
      };

      // call thunk to update business
      await dispatch(editBusiness_thunk(business));

      history.push(`/businesses/${businessId}`);
    }
  };

  return (
    <>
      {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}

      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.header}>Update your business.</h1>
        <input
          type="text"
          placeholder="Title"
          onChange={updateTitle}
          value={title}
          required
          className={styles.input}
        ></input>
        <input
          type="text"
          placeholder="Description"
          onChange={updateDescription}
          value={description}
          required
          className={styles.input}
        ></input>
        <input
          type="text"
          placeholder="Street Address"
          onChange={updateAddress}
          value={address}
          required
          className={styles.input}
        ></input>
        <input
          type="text"
          placeholder="City"
          onChange={updateCity}
          value={city}
          required
          className={styles.input}
        ></input>
        <input
          type="text"
          placeholder="State"
          onChange={updateState}
          value={state}
          className={styles.input}
          required
        ></input>
        <input
          type="text"
          placeholder="Zip Code"
          onChange={updateZipCode}
          value={zipCode}
          required
          className={styles.input}
        ></input>
        <button className={styles.button} type="submit">
          Submit Changes
        </button>
      </form>
    </>
  );
};

export default EditBusinessPage;
