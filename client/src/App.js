import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  IconButton, 
  Modal, 
  TextField,
  Alert 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {

  const [users, setUsers] = useState([{}]);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [message, setMessage] = useState();

  const [createModal, setCreateModal] = useState(false);
  const openCreateModal = () => setCreateModal(true);
  const closeCreateModal = () => setCreateModal(false);

  const [updateModal, setUpdateModal] = useState(false);
  const openUpdateModal = (id) => {
    setUpdateModal(true);
    setId(id);
  }
  const closeUpdateModal = () => setUpdateModal(false);

  async function getUsers(){
    await axios
      .get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
  }

  async function setUser(){
    if(name && lastName){
      const data = { name: name, lastName: lastName }
      await axios
        .post('http://localhost:5000/users', data)
        .then(response => setMessage(`Usuário ${response.data.name} ${response.data.lastName} criado com sucesso!`))
        .then(closeCreateModal())
        .catch(error => setMessage(`Erro: ${error}`))
    }
  }

  async function updateUser(){
    if(name && lastName){
      const data = { name: name, lastName: lastName }
      await axios
        .put(`http://localhost:5000/users/${id}`, data)
        .then(response => setMessage(`Usuário ${response.data.name} ${response.data.lastName} atualizado com sucesso!`))
        .then(closeUpdateModal())
        .catch(error => setMessage(`Erro: ${error}`))
    }
  }

  async function deleteUser(id){
    await axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(response => setMessage(`Usuário ${response.data.name} ${response.data.lastName} deletado com sucesso!`))
  }

  useEffect(() => {
    getUsers()
  }, [setUser, updateUser, deleteUser])

  console.log(message)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 10
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={openCreateModal} variant="contained">Cadastrar Novo Usuário</Button>
        </Box>

        {/* Create User Modal */}
        <Modal
          open={createModal}
          onClose={closeCreateModal}
          aria-labelledby="create-modal-title"
          aria-describedby="create-modal-description"
        >
          <Box 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography sx={{ marginBottom: 2, textAlign: 'center' }}>Informe os dados do usuário</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField 
                id="outlined-basic" 
                label="Nome" 
                variant="outlined" 
                sx={{ marginBottom: 2 }}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField 
                id="outlined-basic" 
                label="Sobrenome" 
                variant="outlined" 
                sx={{ marginBottom: 2 }}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={setUser} variant="contained">Cadastrar</Button>
            </Box>
          </Box>
        </Modal>

        <Typography 
          sx={{ 
            textAlign: 'center',
            marginTop: 3, 
            marginBottom: 3 
          }}
          variant="h5"
        >
          Usuário cadastrados
        </Typography>

        {message ? (
            <Alert 
              sx={{ marginBottom: 2 }} 
              severity="info"
            >
                {message}
            </Alert>
        ) : null}

        {users.map((user) =>{
          return(
            <Card
              sx={{
                display: 'flex',
                width: '20vw',
                marginBottom: 2
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Box>
                  <Typography key={user.name}><strong>Nome:</strong> {user.name}</Typography>
                  <Typography key={user.lastNam}><strong>Sobrenome:</strong> {user.lastName}</Typography>
                  <Typography key={user._id}><strong>ID:</strong> {user._id}</Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Box>
                  <IconButton onClick={() => openUpdateModal(user._id)} color="primary">
                    <EditIcon/>
                  </IconButton>
                  <IconButton onClick={() => deleteUser(user._id)} color="error">
                    <DeleteIcon/>
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          )
        })}

        {/* Update User Modal */}
        <Modal
          open={updateModal}
          onClose={closeUpdateModal}
          aria-labelledby="update-modal-title"
          aria-describedby="update-modal-description"
        >
          <Box 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography sx={{ marginBottom: 2, textAlign: 'center' }}>Informe os dados do usuário</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField 
                id="outlined-basic" 
                label="Nome" 
                variant="outlined" 
                sx={{ marginBottom: 2 }}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField 
                id="outlined-basic" 
                label="Sobrenome" 
                variant="outlined" 
                sx={{ marginBottom: 2 }}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={updateUser} variant="contained">Atualizar</Button>
            </Box>
          </Box>
        </Modal>

      </Box>
    </Box>
  );
}

export default App;
