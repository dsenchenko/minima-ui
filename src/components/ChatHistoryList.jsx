import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const mockCustomers = [
    {
        id: '1',
        firstName: 'Test',
        lastName: 'Chat',
        photo: null // Remove the avatar photo
    }
];

const AbstractPattern = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="20" fill="#F0F0F0"/>
        <path d="M20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10ZM20 28C15.5817 28 12 24.4183 12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20C28 24.4183 24.4183 28 20 28Z" fill="#D1D1D1"/>
        <path d="M20 14C16.6863 14 14 16.6863 14 20C14 23.3137 16.6863 26 20 26C23.3137 26 26 23.3137 26 20C26 16.6863 23.3137 14 20 14ZM20 24C17.7909 24 16 22.2091 16 20C16 17.7909 17.7909 16 20 16C22.2091 16 24 17.7909 24 20C24 22.2091 22.2091 24 20 24Z" fill="#A0A0A0"/>
    </svg>
);

const ChatHistoryList = ({ onUserSelect, selectedUser }) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate API delay
        const timer = setTimeout(() => {
            setCustomers(mockCustomers);
            setLoading(false);
            // Select the single user by default
            onUserSelect(mockCustomers[0]);
        }, 500);

        return () => clearTimeout(timer);
    }, [onUserSelect]);

    if (loading) {
        return <div className="chat-history-loading">Loading...</div>;
    }

    if (error) {
        return <div className="chat-history-error">{error}</div>;
    }

    return (
        <div className="chat-history-list">
            {customers.length === 0 ? (
                <div className="chat-history-empty">No customers found</div>
            ) : (
                customers.map((customer) => (
                    <button
                        key={customer.id}
                        className={`chat-history-item ${selectedUser?.id === customer.id ? 'selected' : ''}`}
                        onClick={() => onUserSelect(customer)}
                    >
                        <div className="chat-history-item-avatar">
                            <AbstractPattern />
                        </div>
                        <div className="chat-history-item-info">
                            <div className="chat-history-item-name">
                                {customer.firstName} {customer.lastName}
                            </div>
                        </div>
                    </button>
                ))
            )}
        </div>
    );
};

ChatHistoryList.propTypes = {
    onUserSelect: PropTypes.func.isRequired,
    selectedUser: PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
    }),
};

export default ChatHistoryList;