import React from 'react'

const styles = {
    textDecoration: 'underline'
}
const UnderlineMark = (props) => {
    return (
        <u style={styles}>{props.children}</u>
    )
}

export default UnderlineMark;