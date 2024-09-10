import PropTypes from "prop-types";

export default function BeverageInfoPost(props) {
  return (
    <div className="card min-w-[250px] max-w-[384px] flex-shrink flex-grow basis-[350px] bg-base-200 shadow-xl">
      <div className="card-body p-6">
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="h-8 w-8 rounded-full">
              <img src={props.avatarImage} />
            </div>
          </div>
          <div>
            <p className="font-regular">{props.avatarName}</p>
          </div>
        </div>
        <div>
          <p className="">{props.primaryInfo}</p>
          <p className="font-light">{props.additionalInfo}</p>
        </div>
      </div>
    </div>
  );
}

BeverageInfoPost.propTypes = {
  avatarImage: PropTypes.string.isRequired,
  avatarName: PropTypes.string.isRequired,
  primaryInfo: PropTypes.string.isRequired,
  additionalInfo: PropTypes.string,
};
