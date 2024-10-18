import React from 'react';

const DisplayDate = ({ date }) => {
    const parsedDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    const tomorrow = new Date(today);

    yesterday.setDate(today.getDate() - 1);
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    let displayText;
    let textColor;

    if (parsedDate.toDateString() === yesterday.toDateString()) {
        displayText = 'Yesterday';
        textColor = 'text-red-600';
    } else if (parsedDate.toDateString() === today.toDateString()) {
        displayText = 'Today';
        textColor = 'text-black';
    } else if (parsedDate.toDateString() === tomorrow.toDateString()) {
        displayText = 'Tomorrow';
        textColor = 'text-green-600';
    } else {
        displayText = formatDate(parsedDate);
        textColor = 'text-gray-600';
    }

    return (
        <p className={`${textColor} text-base font-semibold`}>
            {displayText}
        </p>
    );
};

export default DisplayDate;
