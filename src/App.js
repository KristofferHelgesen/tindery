import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import styled, { css }  from 'styled-components';

/*

  @Status : 14.10.2019

  *Hate button not implemented
  *Strange error with pressing hate button
  *No chech if more users (only adds 1 to the user to show)
  *Its a match MSG should contain a next button
*/



const ButtonContainer = styled.div`
          width:100%;
          display: flex;
          justify-content: space-evenly;
`;
 
const AppContainer = styled.div`
        width: 40%;
        margin: auto;
        padding: 20px;
        margin-top: 20px;
        background-color: rgb(254, 255, 237);
        border-radius: 10px;
`;

const ShowMatchMsg = styled.div`
        width: 40%;
        margin: auto;
        padding: 20px;
        margin-top: 20px;
        background-color: rgb(255, 112, 112);
        border-radius: 10px;
`;

 

const currentUserId = 1;
 

export const Card = props => {
 
  const person = props.person;


  const style = {
   
    btnsContainer: {
      display: "flex",
      justifyContent: "space-evenly"
    },
    btns: {
      width: "50px",
      height: "50px",
      borderRadius: "100%"
    },
    img: {
      width:'100%',
      borderRadius: '10px'
    }
  };
  

  return (
    <AppContainer>
     
      <img style={style.img} src={person.img} alt="sexy-man" />
      <h2>{person.name}</h2>
      <ButtonContainer>

        <Fab color="primary" aria-label="add">
          <AddIcon onClick={() =>props.clickHandler(person.id,currentUserId)}   />
        </Fab>

        <Fab>
          <DeleteOutlinedIcon />
        </Fab>
  
      </ButtonContainer>
      <Link to="/ProfilePage">About</Link>
      </AppContainer>
  );
};

const ProfilePage = (props)  => {

  const person = props.person;
  
  const style = {
    width: "100%",
    img: {
      width:'100%',
      borderRadius: '10px'
    }
  };

  return (

      <AppContainer>

        <img style={style.img} src={person.img} alt="sexy-man" />
        <h2>{person.name}</h2>
        <p>{person.bio}</p>


        <Link to="/">Back</Link>

      </AppContainer>

  );

}


class App extends React.Component {
  state = {
    persons: [
      {
        id: 1,
        name: "Glenn",
        age: "24",
        liked: [],
        hated: [],
        img:
          "https://scontent.fosl3-2.fna.fbcdn.net/v/t1.0-9/15826037_10210017147239184_7671940434670678133_n.jpg?_nc_cat=111&_nc_oc=AQm3KCJxXbbtU8CZa6EAm0wwiP0_UmxeYa6R_mfganjb64i1_T0jLNbZCuHzLM1cMXU&_nc_ht=scontent.fosl3-2.fna&oh=1854a2ff217c62c9730c816a763814f8&oe=5E27ADF5",
        bio: "Lorem ipsddfgdfgium"
      },
      {
        id: 2,
        name: "Stine",
        age: "24",
        liked: [1],
        hated: [],
        img:
          "https://scontent.fosl3-1.fna.fbcdn.net/v/t1.0-9/66503139_10157214091760218_1618939659679694848_n.jpg?_nc_cat=107&_nc_oc=AQlrgkRJQ2kB0MJH0f5vuLMTACjpu-JW8Aug9_pt4iZ5TVMfYE9r6BtUv3ceIMvf9ek&_nc_ht=scontent.fosl3-1.fna&oh=81d01548d014caada7e9fa07ea06c6bc&oe=5E1B524F",
        bio: "Lorem ipsiurrrrm"
      },
      {
        id: 3,
        name: "Henriette",
        age: "24",
        liked: [],
        hated: [],
        img:
          "https://scontent.fosl3-1.fna.fbcdn.net/v/t1.0-9/70514848_10220597115903032_8223373216484163584_n.jpg?_nc_cat=107&_nc_oc=AQmfJcItM0-W9DJG4PHSX_dhFBrmDKgp0Hzhz0uypQcFMckdu8L8nob_maSqEksEWJk&_nc_ht=scontent.fosl3-1.fna&oh=c67c98ffbc4213e64e59e97530213bd8&oe=5E173981",
        bio: "Lorem ipsium444"
      },
      {
        id: 4,
        name: "Joakim",
        age: "24",
        liked: [],
        hated: [],
        img:
          "https://scontent.fosl3-2.fna.fbcdn.net/v/t1.0-9/56403792_10157814975689237_6919821028348657664_n.jpg?_nc_cat=109&_nc_oc=AQkjn-IyvIHZg-oluojTP0juhk_wcXYQcDGom8Jisd_aWE8WsQsDcR7i23XzZdnLsBU&_nc_ht=scontent.fosl3-2.fna&oh=bf55f1549a0b95d2752e3099c89e7d2b&oe=5E30173D",
        bio: "Lorem ipdgfdfgdfgdfgdfgsium"
      }
    ],
    userToShow: 1,
    match:false,
    viewingProfilePage:false
  };

  doTheyLikeEachother = (userId) => {

    let likedArrayIndex = this.state.persons.findIndex(x => x.id === userId);
    let likedArrayUser = this.state.persons[likedArrayIndex].liked;
    let inArray = likedArrayUser.includes(currentUserId);

    if(inArray){
      return true;
    }else{
      return false;
    }

  }

  personLikedPerson = (userId) => {
  
    if(userId && currentUserId){
 
        const indexCurrentUser = this.state.persons.findIndex(x => x.id === currentUserId);
        const copy = [...this.state.persons];
        copy[indexCurrentUser].liked.push(userId);
        let nextToShow = this.state.userToShow + 1;

        this.setState({
          persons:copy,
          userToShow:nextToShow
        });

        if(this.doTheyLikeEachother(userId)){
           this.setState({match:true});
        }

      }
 
  }


   

  render() {

    console.log(this.state);
        
    const style = {
      width: "60%",
      margin: "auto"
    };



    let renderMatchMsg = false;
 

    if(this.state.match === true){

      renderMatchMsg = <ShowMatchMsg>Its a match!</ShowMatchMsg>

    }

 
    return (
      <Router>
          <div style={style}>

              {renderMatchMsg}

          </div>

          <Switch>
          <Route exact  path="/">
               <Card showUser={this.state.userToShow} clickHandler={this.personLikedPerson} person={this.state.persons[this.state.userToShow]} />
            </Route>
            <Route path="/ProfilePage">
              <ProfilePage person={this.state.persons[this.state.userToShow]} />
            </Route>
          
  
            
            <Route>
              <p>page not found</p>
            </Route>
          </Switch>
          



      </Router>

      
    );
  }
}

export default App;
