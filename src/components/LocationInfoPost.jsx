import PropTypes from "prop-types";

export default function LocationInfoPost(props) {
  return (
    <div className="card glass w-96">
      <figure className="h-64 w-full">
        <img src={props.imagePath} alt={props.imageDescription} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.locationName}</h2>
        <p>{props.postInfo}</p>
      </div>
    </div>
  );
}

LocationInfoPost.propTypes = {
  imagePath: PropTypes.string.isRequired,
  imageDescription: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired,
  postInfo: PropTypes.string.isRequired,
};
