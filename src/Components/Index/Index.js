import { useEffect, useState } from "react"
import { Form, Table, Button, Modal, Image } from "react-bootstrap"

import {
  FullContainer,
  TextoFirst,
  Busca,
  FullTabela,
  ButtonAction,
  ImagemModal,
} from "./Styles"

import api from "../api/api"

function Index() {
  const [dados, setDados] = useState([])
  const [page, setPage] = useState([])
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  useEffect(() => {
    getDados()
  }, [])

  async function getDados() {
    const response = await api.get("?results=50")
    const docs = response.data

    setPage(docs.info.page)
    setDados(docs.results)
  }
  async function handleShow() {
    //const response = await api.get(`?id=${this.state.dados.id.value}`)
    //console.log(response)
    setShow(true)
  }

  function orderByName() {}

  return (
    <FullContainer>
      <TextoFirst>
        Olpus igitur est dicere possit dura omni specie. "Tu autem in specie,
        non videntur, necomnino res est. " Et examine ab eis praecepta eius quae
        habes, el prime et principaliter
      </TextoFirst>
      <Busca>
        <Form>
          <Form.Control type="text" placeholder="Searching" />
        </Form>
      </Busca>
      <FullTabela>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th onClick={orderByName}>Name</th>
              <th>Gender</th>
              <th>Birth</th>
              <th>Actions</th>
            </tr>
          </thead>

          {dados.map((dados) => (
            <>
              <tbody>
                <tr key={dados.id.value}>
                  <td>{dados.name.first}</td>
                  <td>{dados.gender}</td>
                  <td>{dados.dob.age}</td>
                  <td>
                    <ButtonAction>
                      <Button variant="outline-primary" onClick={handleShow}>
                        Show
                      </Button>

                      <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                          <ImagemModal>
                            <Image src={dados.picture.medium} roundedCircle />
                          </ImagemModal>
                        </Modal.Header>
                        <Modal.Body>
                          <p>Título: {dados.name.title} </p>
                          <p>Primeiro nome: {dados.name.first} </p>
                          <p>Último nome:{dados.name.last}</p>
                          <p>Email: {dados.email}</p>
                          <p>Gênero: {dados.gender}</p>
                          <p>Data de nascimento: {dados.dob.date}</p>
                          <p>Telefone: {dados.cell} </p>
                          <p>Nacionalidade: {dados.nat}</p>
                          <p>
                            Endereço: {dados.location.street.name} -{" "}
                            {dados.location.street.number} {dados.location.city}{" "}
                            - {dados.location.state} {dados.location.country}
                          </p>
                          <p>ID: {dados.id.value}</p>
                        </Modal.Body>
                      </Modal>
                    </ButtonAction>
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </Table>
      </FullTabela>
    </FullContainer>
  )
}

export default Index
