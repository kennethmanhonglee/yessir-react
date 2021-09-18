import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./CreateBusinessPage.module.css";
import { addBusiness_thunk } from "../../store/businesses";

const CreateBusinessPage = () => {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errors, setErrors] = useState([]);

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
        ownerId: currentUser.id,
        title,
        description,
        address,
        city,
        state,
        zipCode,
      };

      // call thunk to create a business
      const newBusiness = await dispatch(addBusiness_thunk(business));

      const { id } = newBusiness;
      return history.push(`/businesses/${id}`);
    }
  };

  return (
    <>
      {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}

      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.header}>Create your own Business.</h1>
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
          required
          className={styles.input}
        ></input>
        <input
          type="text"
          placeholder="Zip Code"
          onChange={updateZipCode}
          value={zipCode}
          required
          className={styles.input}
        ></input>
        <button type="submit" className={styles.button}>
          Create a business
        </button>
      </form>
    </>
  );
};

export default CreateBusinessPage;
