import { useEffect, useState } from "react"
import { Form, Table, Button, Spinner } from "react-bootstrap"

import {
  FullContainer,
  TextoFirst,
  Busca,
  FullTabela,
  ButtonAction,
  Pagination,
} from "./Styles"

import api from "../api/api"

function Index() {
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    getDados()
  }, [])

  async function getDados() {
    const response = await api.get("?results=50&sort_by")
    const docs = response.data

    setPage(docs.info.page)
    setDados(docs.results)
    setLoading(false)
  }

  async function handleShow(id) {
    console.log(id)
  }

  async function nextPage() {
    const response = await api.get(`/?page=${page + 1}&results=50`)

    const docs = response.data

    setDados(docs.results)
    setPage(docs.info.page)
  }

  async function previousPage() {
    const response = await api.get(`/?page=${page - 1}&results=50`)

    const docs = response.data

    setDados(docs.results)
    setPage(docs.info.page)
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
                  <th>Name</th>
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
