import { useEffect, useState } from "react"
import { Form, Table, Button, Modal } from "react-bootstrap"

import {
  FullContainer,
  TextoFirst,
  Busca,
  FullTabela,
  ButtonAction,
} from "./Styles"

import api from "../api/api"

function Index() {
  const [dados, setDados] = useState([])
  const [page, setPage] = useState([])
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    getDados()
  }, [])

  async function getDados() {
    const response = await api.get("?results=50")
    const docs = response.data

    setDados(docs)
    console.log(dados.results)
  }

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
              <th>Name</th>
              <th>Gender</th>
              <th>Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Marcus</td>
              <td>Masc</td>
              <td>28</td>
              <td>
                <ButtonAction>
                  <Button variant="outline-primary" onClick={handleShow}>
                    Show
                  </Button>

                  <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Woohoo, you're reading this text in a modal!
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </ButtonAction>
              </td>
            </tr>
          </tbody>
        </Table>
      </FullTabela>
    </FullContainer>
  )
}

export default Index
