import React from "react";
import "./Modals.css";
import "./Cards";
import { Button, Modal } from "react-bootstrap";
import { creategroup } from "../auth/groupAuth.js";

// I have used react-bootstrap for styling purposes

class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      Gname: "",
      Descip: "",
      link: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleModal() {
    this.setState({ show: !this.state.show });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ show: !this.state.show });
    creategroup({
      groupname: this.state.Gname,
      description: this.state.Descip,
      link: this.state.link,
    })
      .then((data) => {
        if (data.error) {
          this.setState({
            Gname: "",
            Descip: "",
            link: "",
          });
        } else {
          this.setState({
            Gname: "",
            Descip: "",
            link: "",
          });
        }
      })
      .catch((error) => {
        return console.log(error);
      });
  }
  render() {
    return (
      <div className="modals">
        <Button
          className="createGroup"
          onClick={() => {
            this.handleModal();
          }}
        >
          Create
        </Button>
        <Modal show={this.state.show} onHide={() => this.handleModal()}>
          <Modal.Header closeButton>
            <b>Create Group</b>
          </Modal.Header>

          <Modal.Body>
            {/* 
          Inline styling have in done at input tag.Please go through it */}
            <div>
              <form onSubmit={this.handleSubmit}>
                <label style={{ color: "#8181A5", fontSize: "15px" }}>
                  Name of group
                </label>
                <br />
                <input
                  style={{ backgroundColor: "ivory" }}
                  type="text"
                  placeholder=" Enter Name of group"
                  maxLength="50"
                  name="Gname"
                  value={this.state.Gname}
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <label style={{ color: "#8181A5", fontSize: "15px" }}>
                  Description
                </label>
                <br />
                <textarea
                  style={{ backgroundColor: "ivory", width: "400px" }}
                  type="text"
                  rows="4"
                  column="40"
                  name="Descip"
                  onChange={this.handleChange}
                  placeholder="About the group"
                  value={this.state.Descip}
                />
                <br />
                <label style={{ color: "#8181A5", fontSize: "15px" }}>
                  Link
                </label>
                <br />
                <input
                  style={{ backgroundColor: "ivory" }}
                  type="text"
                  placeholder=" Enter your Zoom/Google-Meet link"
                  name="link"
                  value={this.state.link}
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <hr />
                <button
                  type="submit"
                  className="createGroup"
                  onClick={() => this.props.updateDashboard()}
                >
                  Create
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Modals;

//  <div className={classes.paper}>
//    <h2 id="transition-modal-title">Create Group</h2>
//    <p id="transition-modal-description">react-transition-group animates me.</p>
//    <h4>Group type</h4>
//    <input type="radio" value="OPEN" defaultChecked name="Group" /> Open
//    <input type="radio" value="CLOSE" name="Group" /> Close
//    <p>Name of the group</p>
//    <input type="text" placeholder="Name of the group">
//      {" "}
//    </input>
//  </div>;

// import React from "react";
// import "./Modals.css";
// import './Cards'
// import { Button, Modal } from "react-bootstrap";
// import Cards from "./Cards";

// // I have used react-bootstrap for styling purposes

// class Modals extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       show: false,

//     };
//   }

//   handleModal() {
//     this.setState({ show: !this.state.show });
//   }
//   handleCard() {
//     this.setState({ show: !this.state.show });
//     <Cards />
//   }
//   render() {
//     return (
//       <div className="modals">
//         <Button
//           className="createGroup"
//           onClick={() => {
//             this.handleModal();
//           }}
//         >
//           Create
//         </Button>
//         <Modal show={this.state.show} onHide={() => this.handleModal()}>
//           <Modal.Header closeButton>
//             <b>Create Group</b>
//           </Modal.Header>

//           <Modal.Body>
// {/*
//           Inline styling have in done at input tag.Please go through it */}
//           .

//             <div>

//               <label style={{ color: "#8181A5", fontSize: "15px" }}>
//                 Name of group
//               </label>
//               <br />
//               <input
//                 style={{ backgroundColor: "ivory" }}
//                 type="text"
//                 placeholder=" Enter Name of group"
//                 maxLength="50"
//                 value={}
//               />
//               <br />
//               <br />
//               <label style={{ color: "#8181A5", fontSize: "15px" }}>
//                 Description
//               </label>
//               <br />
//               <textarea
//                 style={{ backgroundColor: "ivory",width: "400px"}}
//                 type="text"
//                 rows="4"
//                 column='40'
//                 placeholder="About the group"
//                 value={}

//               />
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button
//               className="createGroup"
//               onClick={() => {
//                 this.handleCard();
//                 // <Cards />
//               }}
//             >
//               Create
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default Modals;
