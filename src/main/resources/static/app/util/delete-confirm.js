var React = require('react');
var { Button, Modal } = require('react-bootstrap');

var Confirm = React.createClass({

    getDefaultProps() {
        return {
            cancelText: 'Cancel',
            confirmText: 'Confirm',
            confirmBSStyle: 'danger',
            showCancelButton: true,
        };
    },

    getInitialState() {
        if (!this.props.visible) {
            return {
                isOpened: false,
            };
        } else {
            return {
                isOpened: true,
            };
        }
    },

    onButtonClick() {
        this.setState({
            isOpened: true,
        });
    },

    onClose() {
        this.setState({
            isOpened: false,
        });
    },

    onConfim() {
        this.setState({
            isOpened: false,
        });
        this.props.onConfirm();
    },

    render() {
      var cancelButton = this.props.showCancelButton ?
          (<Button bsStyle="default" onClick={this.onClose}>{this.props.cancelText}</Button>) : null;
        var modal = (
            <Modal show={this.state.isOpened} onHide={this.onClose}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.body}
                </Modal.Body>
                <Modal.Footer>
                    {cancelButton}
                    <Button bsStyle={this.props.confirmBSStyle} onClick={this.onConfim}>{this.props.confirmText}</Button>
                </Modal.Footer>
            </Modal>
        );
        var content;
        if (this.props.children) {
            var btn = React.Children.only(this.props.children);
            content = React.cloneElement(btn, {
                onClick: this.onButtonClick,
                style: this.props.style
            },
                btn.props.children,
                modal
            );
        } else {
            content = (
                <Button onClick={this.onButtonClick} style={this.props.style}>
                    {this.props.buttonText}
                    {modal}
                </Button>
            );
        }
        return content;
    },
});

module.exports = Confirm;
