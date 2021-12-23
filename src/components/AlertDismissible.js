import React, { useState } from "react"
import Alert from "react-bootstrap/Alert"

const AlertDismissible = (props) => {

    const [show, setShow] = useState(props.isShow)

    const style = {
        "width": "100%",
        "display": "flex",
        "justifyContent": "center",
        "margin": "auto",
    }

    let variant = props.variant

    if (show) {
        return (
            <div style={style}>
                <Alert variant={variant} onClose={() => setShow(false)} >
                    <Alert.Heading>
                        {props.content}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Alert.Heading>
                </Alert>
            </div>
        )
    }
    return (
        <div></div>
    )
}

export default AlertDismissible