import * as React from "react";

interface Props {

}

export default class HomePage extends React.Component<Props> {
    render() {
        return <div>
            <button>Login As Admin</button>
            <button>Login As User</button>
        </div>
    }
}