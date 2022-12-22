import React from "react";

class TravelAgentThumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      thumb: undefined,
    };
  }
  componentDidMount() {
    if (!this.props.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(this.props.file);
    });
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;
    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    return (
      <img
        src={thumb}
        alt="Test"
        className="img-thumbnail mt-2"
        height={200}
        width={200}
      />
    );
  }
}

export default TravelAgentThumb;
