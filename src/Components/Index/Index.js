import { useEffect, useState } from "react"
import { Form, Table, Button, Modal, Image } from "react-bootstrap"

import {
  FullContainer,
  TextoFirst,
  Busca,
  FullTabela,
  ButtonAction,
  ImagemModal,
  Pagination,
} from "./Styles"

import api from "../api/api"

function Index() {
  const [dados, setDados] = useState([])
  const [newDados, setNewDados] = useState({})
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
  async function handleShow(id) {
    const response = await api.get(`?id=${id}`)

    console.log(response)
  }

  async function nextPage() {
    const response = await api.get(`/?page=${page + 1}&results=50`)

    const docs = response.data

    setDados(docs.results)
    setPage(docs.info.page)
  }

  async function previousPage() {
    const response = await api.get(`/?page=${page}&results=50`)

    const docs = response.data

    setDados(docs.results)
    setPage(docs.info.page)
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
            {dados.map((dados) => (
              <tr key={dados.login.uuid}>
                <>
                  <td>{dados.name.first}</td>
                  <td>{dados.gender}</td>
                  <td>{dados.dob.age}</td>

                  <td>
                    <ButtonAction>
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          handleShow(dados.id.value)
                        }}
                      >
                        Show
                      </Button>
                    </ButtonAction>
                  </td>
                </>
              </tr>
            ))}
          </tbody>
        </Table>
      </FullTabela>
      <Pagination>
        <button onClick={previousPage}>Página Anterior</button>
        <button onClick={nextPage}>Próxima página</button>
        Página atual: {page}
      </Pagination>
    </FullContainer>
  )
}

export default Index
