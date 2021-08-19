import { useEffect, useState } from "react"
import { Form, Table, Button, Spinner, Modal, Image } from "react-bootstrap"

import {
  FullContainer,
  TextoFirst,
  Busca,
  FullTabela,
  ButtonAction,
  Pagination,
  ImagemModal,
  Modals,
  TextModal,
} from "./Styles"

import api from "../api/api"

function Index() {
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState([])
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState("")
  const [newDados, setNewDados] = useState(null)

  useEffect(() => {
    getDados()
  }, [])

  async function getDados() {
    const response = await api.get("?results=50&sort_by")
    const docs = response.data

    docs.results.sort((a, b) => (a.name.first > b.name.first ? 1 : -1))

    setPage(docs.info.page)
    setDados(docs.results)
    setLoading(false)
  }

  async function handleShow(id) {
    setShow(true)
    setNewDados(id)
    console.log(id)
  }

  async function nextPage() {
    const response = await api.get(`/?page=${page + 1}&results=50`)

    const docs = response.data

    docs.results.sort((a, b) => (a.name.first > b.name.first ? 1 : -1))

    setDados(docs.results)
    setPage(docs.info.page)
  }

  async function previousPage() {
    const response = await api.get(`/?page=${page - 1}&results=50`)

    const docs = response.data

    docs.results.sort((a, b) => (a.name.first > b.name.first ? 1 : -1))

    setDados(docs.results)
    setPage(docs.info.page)
  }

  async function handleOrder(id) {
    id.sort((a, b) => (a.name.first > b.name.first ? 1 : -1))
    console.log(id)
  }

  const filteredNames = dados.filter((names) => {
    return names.name.first.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <FullContainer>
      {loading ? (
        <Spinner animation="grow" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div>
          <TextoFirst>
            Olpus igitur est dicere possit dura omni specie. "Tu autem in
            specie, non videntur, necomnino res est. " Et examine ab eis
            praecepta eius quae habes, el prime et principaliter
          </TextoFirst>
          <Busca>
            <Form>
              <Form.Control
                type="text"
                placeholder="Searching"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Busca>
          <FullTabela>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th
                    onClick={() => {
                      handleOrder(dados)
                    }}
                  >
                    Name
                  </th>
                  <th>Gender</th>
                  <th>Birth</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredNames.map((dados) => (
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
                              handleShow(dados)
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

              {newDados && (
                <Modal
                  show={show}
                  onHide={() => setShow(false)}
                  dialogClassName="modal-90w"
                >
                  <Modals>
                    <Modal.Header>
                      <Modal.Title>
                        <ImagemModal>
                          <Image src={newDados.picture.medium} roundedCircle />
                        </ImagemModal>
                        {newDados.name.title} {newDados.name.first}{" "}
                        {newDados.name.last}
                      </Modal.Title>
                    </Modal.Header>
                  </Modals>
                  <Modal.Body>
                    <TextModal>
                      <p>
                        <strong>Email</strong>: {newDados.email}
                      </p>
                      <p>
                        <strong>Gênero</strong>: {newDados.gender}
                      </p>
                      <p>
                        <strong>Data de nascimento</strong>: {newDados.dob.date}
                      </p>
                      <p>
                        <strong>Telefone</strong>: {newDados.cell}{" "}
                      </p>
                      <p>
                        <strong>Nacionalidade</strong>: {newDados.nat}
                      </p>
                      <p>
                        <strong>Endereço</strong>:{" "}
                        {newDados.location.street.name} -{" "}
                        {newDados.location.street.number}{" "}
                        {newDados.location.city} - {newDados.location.state}{" "}
                        {newDados.location.country}
                      </p>
                      <p>
                        <strong>ID</strong>: {newDados.id.value}
                      </p>
                    </TextModal>
                  </Modal.Body>
                </Modal>
              )}
            </Table>
          </FullTabela>
          Página atual: {page}
          <Pagination>
            {page === 1 ? (
              <>
                <Button
                  variant="outline-primary"
                  disabled
                  onClick={previousPage}
                >
                  Página Anterior
                </Button>
                <Button variant="outline-primary" onClick={nextPage}>
                  Próxima página
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-primary" onClick={previousPage}>
                  Página Anterior
                </Button>
                <Button variant="outline-primary" onClick={nextPage}>
                  Próxima página
                </Button>
              </>
            )}
          </Pagination>
        </div>
      )}
    </FullContainer>
  )
}

export default Index
