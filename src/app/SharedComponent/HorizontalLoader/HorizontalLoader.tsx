import * as React from "react";
import "./horizontal-loader.css"

interface Props {
    paddingTop?: number;
    paddingBottom?: number;
    width?: string | number;
    margin?: string;
    display?: string;
}

export default class HorizontalLoader extends React.Component<Props> {

    static defaultProps = {
        paddingTop: 96,
        paddingBottom: 96,
        margin: '0 auto',
        width: '100%',
        display: 'block'
    };

    render() {
        const style = {
            paddingBottom: this.props.paddingBottom,
            paddingTop: this.props.paddingTop,
            margin: this.props.margin,
            width: this.props.width,
            display: this.props.display
        };
        return (
            <div style={style} className="initial-load-animation">
                <div className="loading-bar">
                    <div className="blue-bar"/>
                </div>
            </div>
        )
    }

}