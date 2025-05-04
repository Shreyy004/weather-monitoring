import React from 'react';

function Ifr({ url }) {
    return (
        <iframe
            src={url}
            title="Embedded Content"
            width="855"
            height="700"
        />
    );
}

export default Ifr;