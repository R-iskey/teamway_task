import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return <div>
    <p>Sorry, the page you visited does not exist.</p>
  </div>;
}

export default NotFound;
