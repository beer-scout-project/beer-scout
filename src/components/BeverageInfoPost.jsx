import PropTypes from "prop-types";

export default function BeverageInfoPost(props) {
  return (
    <div>
      <div className="card min-w-max max-w-96 bg-base-200 shadow-xl">
        <div className="card-body p-6">
          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="h-8 w-8 rounded-full">
                <img src={props.locationImage} />
              </div>
            </div>
            <div>
              <p className="font-bold">{props.locationName}</p>
            </div>
          </div>
          <div>
            <p className="text-secondary">{props.beverageInfo}</p>
            <p className="font-light text-gray-300">{props.additionalInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

BeverageInfoPost.propTypes = {
  locationImage: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired,
  beverageInfo: PropTypes.string.isRequired,
  additionalInfo: PropTypes.string,
};
