import Footer from "../Footer";
import Header from "../Header";

function Contact() {
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const name = form.elements[0].value;
    //     const email = form.elements[1].value;
    //     const message = form.elements[2].value;
    //     console.log({ name, email, message });
    //     alert('Thank you for your message!');
    //     form.reset();
    //     window.location.href = '/'; // Redirect to home page after submission
    //     fetch('https://your-service-app-endpoint.com/api/contact', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ name, email, message }),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('Service response:', data);
    //         })
    //         .catch(error => {
    //             console.error('Error calling service:', error);
    //         });
    // };

    return (
        <div>
            <Header />
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Contact Us</h1>
            <p>If you have any questions, feel free to reach out!</p>
            <form >
                <div style={{ marginBottom: '10px' }}>
                    <input type="text" placeholder="Your Name" style={{ padding: '10px', width: '300px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input type="email" placeholder="Your Email" style={{ padding: '10px', width: '300px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <textarea placeholder="Your Message" style={{ padding: '10px', width: '300px', height: '100px' }}></textarea>
                </div>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px' }}>Send</button>
            </form>
        </div>
        <Footer />
        </div>
    );
}
export default Contact;