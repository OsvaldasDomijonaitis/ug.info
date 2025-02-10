import PropTypes from 'prop-types';

function Footer({text}) {
  return (
    <footer className="read-the-docs">
        {text}
    </footer>
  )
}

Footer.propTypes = {
  text: PropTypes.string
};

export default Footer
