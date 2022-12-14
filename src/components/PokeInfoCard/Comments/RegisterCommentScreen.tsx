import { Button, Form, FormFeedback, FormGroup, FormText, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";

export function RegisterCommentScreen({ toggleRegisterView }:{
    toggleRegisterView: () => void
}) {

    function handleSubmit(e: any) {
        e.preventDefault()
        if(!e.target.username.value.trim()) return
        if(!e.target.email.value.trim()) return

        const data = {
            username: e.target.username.value,
            email: e.target.email.value,
        }

        localStorage.setItem('user_data', JSON.stringify(data))

        toggleRegisterView()
    }

    return (
        <div style={{
            minHeight: "295px",
        }} className="d-flex align-items-center w-100 mt-5 text-center text-muted flex-column">

            <h5 className="mt-3 mb-4 mx-1">
                Insira seu nome e e-mail para comentar e ver comentários.
            </h5>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <InputGroupText style={{fontSize: "14px"}}>
                        Nome
                    </InputGroupText>
                    <Input  style={{fontSize: "14px"}} id="username" name="username" placeholder="Insira seu nome" />
                </InputGroup>

                <InputGroup className="mt-3" >
                    <InputGroupText  style={{fontSize: "14px"}}>
                        E-mail
                    </InputGroupText>
                    <Input style={{fontSize: "14px"}} id="email" name="email" placeholder="Insira seu email" />
                </InputGroup>
                <Button style={{fontSize: "15px"}} className="mt-4 w-100" color="primary" outline> Entrar </Button>
            </Form>
        </div>
    )
}