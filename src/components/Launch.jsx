import "./Launch.css";


export const Launch = ({launch}) => { 
    return (
<div className="content-wrapper" >
          <div className="img">
            <img src={launch.links.mission_patch_small} alt="" />
          </div>
          <div className="name">{launch.mission_name}</div>
          <div className="description">{launch.details}</div>
          <div className="date">
            <time>{launch.launch_date_local}</time>
          </div>
        </div>
)}
