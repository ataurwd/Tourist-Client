import React from 'react';
import axios from 'axios';
import Swal from "sweetalert2";


const JoinAsGuild = () => {
    const handleSubmit = async(e) => {
        e.preventDefault();
        // submit form to the server
        const form = e.target
        const titel = form.applicationTitle.value
        const reason = form.reasonForTourGuide.value
        const cvLink = form.cvLink.value
        const status = "pending"
        const formData = {titel, reason, cvLink, status}
      
      await axios.post(`${import.meta.env.VITE_URL}/guide`, formData)
        .then(res => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Your Request Sucessfull!",
              icon: "success",
              draggable: false,
            });
            form.reset();
        }
      })
      
    }
    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md mt-5">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Tour Guide Application</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label
              htmlFor="applicationTitle"
              className="label text-sm font-medium text-gray-700"
            >
              <span className="label-text">Application Title</span>
            </label>
            <input
              type="text"
              id="applicationTitle"
              name="applicationTitle"
              required
              className="input input-bordered w-full"
            />
          </div>
  
          <div className="form-control mb-4">
            <label
              htmlFor="reasonForTourGuide"
              className="label text-sm font-medium text-gray-700"
            >
              <span className="label-text">Why do you want to be a Tour Guide?</span>
            </label>
            <textarea
              id="reasonForTourGuide"
              name="reasonForTourGuide"
              required
              rows="4"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
  
          <div className="form-control mb-6">
            <label
              htmlFor="cvLink"
              className="label text-sm font-medium text-gray-700"
            >
              <span className="label-text">CV Link</span>
            </label>
            <input
              type="url"
              id="cvLink"
              name="cvLink"
              required
              className="input input-bordered w-full"
            />
          </div>
  
          <div className="text-center">
            <button
              type="submit"
              className="btn bg-primary text-white w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
};

export default JoinAsGuild;