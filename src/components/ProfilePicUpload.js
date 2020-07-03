import React, { Component } from "react";
import AboutContext from "../context/aboutContext";
import axios from "axios";
import { domain } from "../config/constants";

export class ProfilePicUpload extends Component {
  state = {
    profilePic: ""
  };

  submitProfilePic = photo => {
    this.verifyToken;
    console.log("submitting new profile pic");

    let formData = new FormData();
    formData.append("file", this.state.profilePic);

    axios
      .post(`${domain}/api/about/profile-pic`, formData, {
        headers: {
          authorization: `bearer ${window.sessionStorage.ayaToken}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        if (res.data) {
          console.log(res);
          this.props.toState({
            edit: "",
            imageHash: Date.now(),
            profilePic: `${domain}/uploads/about/profile-pic.jpg`
          });
        }
      })
      .catch(err => {
        console.log(err);
        alert("image failed to upload");
      });
  };

  render() {
    return (
      <AboutContext.Consumer>
        {context => (
          <div className="profile-pic-form profile-pic">
            <form>
              <input
                id="profilePicUpload"
                type="file"
                name="photoUpload"
                accept="image/png,image/jpeg"
                onChange={e =>
                  this.setState({
                    profilePic: e.target.files[0]
                  })
                }
              />
              <span className="cancel-submit">
                <input
                  type="button"
                  name="profile-pic-edit-cancel"
                  className="cancel-button"
                  value="Cancel"
                  onClick={() =>
                    this.props.toState({
                      edit: "",
                      profilePic: `${domain}/uploads/about/profile-pic.jpg`
                    })
                  }
                />

                <input
                  type="button"
                  name="submitPhoto"
                  className="submit-button"
                  value="Submit"
                  onClick={() => this.submitProfilePic()}
                />
              </span>
            </form>
          </div>
        )}
      </AboutContext.Consumer>
    );
  }
}

export default ProfilePicUpload;
