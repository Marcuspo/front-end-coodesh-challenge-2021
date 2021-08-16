import { Image, Navbar } from "react-bootstrap"
import { FullContainer } from "./Styles"

import CompanyImage from "../Images/company-image.png"
import AccountImage from "../Images/account-image.png"

function TopBar() {
  return (
    <FullContainer>
      <Navbar>
        <Navbar.Brand href="#home">
          <Image src={CompanyImage} thumbnail />
          Company
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Image src={AccountImage} roundedCircle />
        </Navbar.Collapse>
      </Navbar>
    </FullContainer>
  )
}

export default TopBar
