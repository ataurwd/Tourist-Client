import React from 'react';
import usePackage from './../../hooks/usePackage';

const AdminStories = () => {
    const [packageItem] = usePackage()
    
    return (
        <div>
            admin stories{packageItem.length}
        </div>
    );
};

export default AdminStories;