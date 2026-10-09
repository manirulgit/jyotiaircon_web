import React, { useState, useEffect, useRef } from 'react';
import './Video.css';   
import Header from '../header';
import Footer from '../Footer';

function Video() {
    // State management for video calling system
    const [isCallActive, setIsCallActive] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [callStatus, setCallStatus] = useState('idle'); // idle, calling, connected, ended
    const [callDuration, setCallDuration] = useState(0);
    const [activeTab, setActiveTab] = useState('contacts');

    // Refs for video elements
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const chatEndRef = useRef(null);

    // Mock contacts data with mobile integration
    const mockContacts = [
        {
            id: 1,
            name: 'manirul mallick',
            phone: '+91-7003511367',
            whatsapp: '+91 7003511367',
            email: 'manirul@company.com',
            department: 'Sales',
            status: 'online',
            avatar: 'JS',
            lastSeen: 'Active now',
            platform: 'WhatsApp'
        },
        {
            id: 2,
            name: 'Biswajit',
            phone: '+1-555-0124',
            whatsapp: '+1-555-0124',
            email: 'biswajit@company.com',
            department: 'Marketing',
            status: 'online',
            avatar: 'SJ',
            lastSeen: 'Active now',
            platform: 'Mobile App'
        }
        
 
        
    ];

    // Initialize contacts
    useEffect(() => {
        setContacts(mockContacts);
    }, []);

    // Call duration timer
    useEffect(() => {
        let interval;
        if (callStatus === 'connected') {
            interval = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        } else {
            setCallDuration(0);
        }
        return () => clearInterval(interval);
    }, [callStatus]);

    // Auto-scroll chat to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    // Format call duration
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle video call functions
    const initiateCall = async (contact, callType = 'video') => {
        setSelectedContact(contact);
        setCallStatus('calling');
        setIsCallActive(true);

        // Simulate call connection
        setTimeout(() => {
            setCallStatus('connected');
            addSystemMessage(`Connected to ${contact.name} via ${contact.platform}`);
        }, 3000);

        // Mock getUserMedia for demo
        try {
            if (localVideoRef.current) {
                // In real implementation, this would be:
                // const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                // localVideoRef.current.srcObject = stream;
                localVideoRef.current.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            }
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    };

    const endCall = () => {
        setCallStatus('ended');
        setIsCallActive(false);
        setIsScreenSharing(false);
        setCallDuration(0);
        
        if (selectedContact) {
            addSystemMessage(`Call ended with ${selectedContact.name}`);
        }
        
        setTimeout(() => {
            setCallStatus('idle');
            setSelectedContact(null);
        }, 2000);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        addSystemMessage(isMuted ? 'Microphone unmuted' : 'Microphone muted');
    };

    const toggleVideo = () => {
        setIsVideoOff(!isVideoOff);
        addSystemMessage(isVideoOff ? 'Camera turned on' : 'Camera turned off');
    };

    const toggleScreenShare = async () => {
        if (!isScreenSharing) {
            try {
                // In real implementation:
                // const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                setIsScreenSharing(true);
                addSystemMessage('Screen sharing started');
            } catch (error) {
                console.error('Error sharing screen:', error);
                addSystemMessage('Failed to start screen sharing');
            }
        } else {
            setIsScreenSharing(false);
            addSystemMessage('Screen sharing stopped');
        }
    };

    // Chat functions
    const addSystemMessage = (message) => {
        const systemMessage = {
            id: Date.now(),
            text: message,
            sender: 'system',
            timestamp: new Date().toLocaleTimeString()
        };
        setChatMessages(prev => [...prev, systemMessage]);
    };

    const sendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: Date.now(),
                text: newMessage,
                sender: 'me',
                timestamp: new Date().toLocaleTimeString()
            };
            setChatMessages(prev => [...prev, message]);
            setNewMessage('');

            // Simulate received message
            setTimeout(() => {
                const reply = {
                    id: Date.now() + 1,
                    text: `Thanks for your message: "${newMessage}"`,
                    sender: selectedContact?.name || 'Contact',
                    timestamp: new Date().toLocaleTimeString()
                };
                setChatMessages(prev => [...prev, reply]);
            }, 1000);
        }
    };

    // WhatsApp integration
    const openWhatsApp = (contact) => {
        const message = encodeURIComponent(`Hi ${contact.name}, I'd like to start a video call through our payroll system.`);
        const whatsappUrl = `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    // Mobile app integration
    const openMobileApp = (contact) => {
        // Deep link to mobile app (this would be configured based on your mobile app)
        const deepLink = `payrollapp://call/${contact.id}`;
        window.location.href = deepLink;
        
        // Fallback to app store if app not installed
        setTimeout(() => {
            alert('Mobile app not detected. Please install the Payroll Mobile App from your app store.');
        }, 1000);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return '#28a745';
            case 'away': return '#ffc107';
            case 'busy': return '#dc3545';
            default: return '#6c757d';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'online': return 'fas fa-circle';
            case 'away': return 'fas fa-moon';
            case 'busy': return 'fas fa-minus-circle';
            default: return 'fas fa-circle';
        }
    };

    return (
        <div className="video-calling-system">
            <Header />
            
            {/* Video Calling Header */}
            <div className="video-header">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="page-title">
                                <i className="fas fa-video me-3"></i>
                                Video Communication Center
                            </h2>
                            <p className="page-subtitle">Connect with team members via WhatsApp, Mobile App, or Web Video Calls</p>
                        </div>
                        <div className="col-auto">
                            <div className="connection-status">
                                <i className="fas fa-wifi text-success me-2"></i>
                                <span className="status-text">Connected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="video-content">
                <div className="container-fluid">
                    <div className="row">
                        
                        {/* Sidebar - Contacts and Controls */}
                        <div className="col-md-4 col-lg-3">
                            <div className="sidebar-panel">
                                
                                {/* Navigation Tabs */}
                                <div className="sidebar-tabs">
                                    <button 
                                        className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('contacts')}
                                    >
                                        <i className="fas fa-users me-2"></i>
                                        Contacts
                                    </button>
                                    <button 
                                        className={`tab-btn ${activeTab === 'recent' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('recent')}
                                    >
                                        <i className="fas fa-history me-2"></i>
                                        Recent
                                    </button>
                                </div>

                                {/* Contacts List */}
                                {activeTab === 'contacts' && (
                                    <div className="contacts-section">
                                        <div className="search-box">
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="fas fa-search"></i>
                                                </span>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Search contacts..."
                                                />
                                            </div>
                                        </div>

                                        <div className="contacts-list">
                                            {contacts.map(contact => (
                                                <div key={contact.id} className="contact-item">
                                                    <div className="contact-info">
                                                        <div className="contact-avatar">
                                                            {contact.avatar}
                                                            <div 
                                                                className="status-indicator"
                                                                style={{ backgroundColor: getStatusColor(contact.status) }}
                                                            ></div>
                                                        </div>
                                                        <div className="contact-details">
                                                            <div className="contact-name">{contact.name}</div>
                                                            <div className="contact-dept">{contact.department}</div>
                                                            <div className="contact-status">
                                                                <i className={`${getStatusIcon(contact.status)} me-1`}></i>
                                                                {contact.lastSeen}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="contact-actions">
                                                        <button 
                                                            className="btn btn-sm btn-primary"
                                                            onClick={() => initiateCall(contact, 'video')}
                                                            title="Video Call"
                                                        >
                                                            <i className="fas fa-video"></i>
                                                        </button>
                                                        <button 
                                                            className="btn btn-sm btn-success"
                                                            onClick={() => contact.platform === 'WhatsApp' ? openWhatsApp(contact) : openMobileApp(contact)}
                                                            title={contact.platform}
                                                        >
                                                            <i className={contact.platform === 'WhatsApp' ? 'fab fa-whatsapp' : 'fas fa-mobile-alt'}></i>
                                                        </button>
                                                        <button 
                                                            className="btn btn-sm btn-info"
                                                            onClick={() => {
                                                                setSelectedContact(contact);
                                                                setShowChat(true);
                                                            }}
                                                            title="Chat"
                                                        >
                                                            <i className="fas fa-comment"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Recent Calls */}
                                {activeTab === 'recent' && (
                                    <div className="recent-section">
                                        <div className="recent-list">
                                            <div className="recent-item">
                                                <div className="recent-info">
                                                    <div className="recent-contact">John Smith</div>
                                                    <div className="recent-details">
                                                        <i className="fas fa-video text-success me-1"></i>
                                                        Video Call • 15:30
                                                    </div>
                                                </div>
                                                <button className="btn btn-sm btn-outline-primary">
                                                    <i className="fas fa-phone"></i>
                                                </button>
                                            </div>
                                            <div className="recent-item">
                                                <div className="recent-info">
                                                    <div className="recent-contact">Sarah Johnson</div>
                                                    <div className="recent-details">
                                                        <i className="fab fa-whatsapp text-success me-1"></i>
                                                        WhatsApp • 14:20
                                                    </div>
                                                </div>
                                                <button className="btn btn-sm btn-outline-success">
                                                    <i className="fab fa-whatsapp"></i>
                                                </button>
                                            </div>
                                            <div className="recent-item">
                                                <div className="recent-info">
                                                    <div className="recent-contact">Mike Davis</div>
                                                    <div className="recent-details">
                                                        <i className="fas fa-mobile-alt text-info me-1"></i>
                                                        Mobile App • 12:45
                                                    </div>
                                                </div>
                                                <button className="btn btn-sm btn-outline-info">
                                                    <i className="fas fa-mobile-alt"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Video Area */}
                        <div className="col-md-8 col-lg-9">
                            <div className="video-area">
                                
                                {/* Video Call Interface */}
                                {isCallActive ? (
                                    <div className="call-interface">
                                        <div className="video-container">
                                            
                                            {/* Remote Video */}
                                            <div className="remote-video">
                                                <video ref={remoteVideoRef} autoPlay playsInline>
                                                    <div className="video-placeholder">
                                                        <div className="contact-avatar-large">
                                                            {selectedContact?.avatar}
                                                        </div>
                                                        <div className="contact-name-large">{selectedContact?.name}</div>
                                                    </div>
                                                </video>
                                                
                                                {/* Call Status Overlay */}
                                                <div className="call-status-overlay">
                                                    <div className="call-info">
                                                        <div className="call-status-text">
                                                            {callStatus === 'calling' && (
                                                                <>
                                                                    <i className="fas fa-phone fa-pulse me-2"></i>
                                                                    Calling {selectedContact?.name}...
                                                                </>
                                                            )}
                                                            {callStatus === 'connected' && (
                                                                <>
                                                                    <i className="fas fa-circle text-success me-2"></i>
                                                                    {formatDuration(callDuration)}
                                                                </>
                                                            )}
                                                        </div>
                                                        {isScreenSharing && (
                                                            <div className="screen-share-indicator">
                                                                <i className="fas fa-desktop me-2"></i>
                                                                Screen Sharing
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Local Video */}
                                            <div className="local-video">
                                                <video ref={localVideoRef} autoPlay muted playsInline>
                                                    <div className="video-placeholder-small">
                                                        <div className="local-avatar">You</div>
                                                    </div>
                                                </video>
                                                {isVideoOff && (
                                                    <div className="video-off-overlay">
                                                        <i className="fas fa-video-slash"></i>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Call Controls */}
                                        <div className="call-controls">
                                            <div className="control-buttons">
                                                <button 
                                                    className={`control-btn ${isMuted ? 'muted' : ''}`}
                                                    onClick={toggleMute}
                                                    title={isMuted ? 'Unmute' : 'Mute'}
                                                >
                                                    <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
                                                </button>
                                                
                                                <button 
                                                    className={`control-btn ${isVideoOff ? 'video-off' : ''}`}
                                                    onClick={toggleVideo}
                                                    title={isVideoOff ? 'Turn On Camera' : 'Turn Off Camera'}
                                                >
                                                    <i className={`fas ${isVideoOff ? 'fa-video-slash' : 'fa-video'}`}></i>
                                                </button>
                                                
                                                <button 
                                                    className={`control-btn ${isScreenSharing ? 'sharing' : ''}`}
                                                    onClick={toggleScreenShare}
                                                    title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                                                >
                                                    <i className="fas fa-desktop"></i>
                                                </button>
                                                
                                                <button 
                                                    className={`control-btn ${showChat ? 'active' : ''}`}
                                                    onClick={() => setShowChat(!showChat)}
                                                    title="Toggle Chat"
                                                >
                                                    <i className="fas fa-comment"></i>
                                                </button>
                                                
                                                <button 
                                                    className="control-btn end-call"
                                                    onClick={endCall}
                                                    title="End Call"
                                                >
                                                    <i className="fas fa-phone-slash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    
                                    /* Welcome Screen */
                                    <div className="welcome-screen">
                                        <div className="welcome-content">
                                            <div className="welcome-icon">
                                                <i className="fas fa-video"></i>
                                            </div>
                                            <h3>Video Communication Center</h3>
                                            <p>Select a contact to start a video call, WhatsApp call, or mobile app connection</p>
                                            
                                            <div className="feature-cards">
                                                <div className="feature-card">
                                                    <div className="feature-icon whatsapp">
                                                        <i className="fab fa-whatsapp"></i>
                                                    </div>
                                                    <h5>WhatsApp Integration</h5>
                                                    <p>Connect directly with WhatsApp for instant communication</p>
                                                </div>
                                                
                                                <div className="feature-card">
                                                    <div className="feature-icon mobile">
                                                        <i className="fas fa-mobile-alt"></i>
                                                    </div>
                                                    <h5>Mobile App Calls</h5>
                                                    <p>Deep link integration with your mobile application</p>
                                                </div>
                                                
                                                <div className="feature-card">
                                                    <div className="feature-icon screen">
                                                        <i className="fas fa-desktop"></i>
                                                    </div>
                                                    <h5>Screen Sharing</h5>
                                                    <p>Share your screen for better collaboration</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Panel */}
            {showChat && (
                <div className="chat-panel">
                    <div className="chat-header">
                        <div className="chat-title">
                            <i className="fas fa-comment me-2"></i>
                            Chat {selectedContact && `with ${selectedContact.name}`}
                        </div>
                        <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setShowChat(false)}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div className="chat-messages">
                        {chatMessages.map(message => (
                            <div key={message.id} className={`message ${message.sender === 'me' ? 'sent' : message.sender === 'system' ? 'system' : 'received'}`}>
                                <div className="message-content">
                                    <div className="message-text">{message.text}</div>
                                    <div className="message-time">{message.timestamp}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    
                    <div className="chat-input">
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <button 
                                className="btn btn-primary"
                                onClick={sendMessage}
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </div>
    );
}

export default Video;