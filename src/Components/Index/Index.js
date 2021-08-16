import { Form } from "react-bootstrap"

import { FullContainer, TextoFirst, Busca } from "./Styles"

function Index() {
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
    </FullContainer>
  )
}

export default Index
