import React from 'react';
import AddStories from './../../components/shared/AddStories';

const AdminAddStories = () => {
    return (
        <div>
            <AddStories url={'/dashboard/admin-story'}/>
        </div>
    );
};

export default AdminAddStories;