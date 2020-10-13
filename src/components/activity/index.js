import './index.scss'

import React, { useState } from 'react';

const Activity = () => {
    const [activityBar, setActivityBar] = useState(true);
    return (
        <div className="activity" style={activityBar ? { left: -275 } : { left: 0 }}>
            <div className="activity_button" onClick={() => setActivityBar(!activityBar)}>
                <div>ACTVITY</div>
            </div>
            <div className="content p-3">
                {/* <div className="users_online"><UserIcon className="p-1" fill={'#ffffff'} /> <span>users online: 0</span></div> */}
                <div className="recent_searches">
                    <span>Recent Searches:</span>
                </div>
            </div>
        </div>
    );
}

export default Activity;
