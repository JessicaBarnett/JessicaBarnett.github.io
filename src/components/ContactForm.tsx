import { useState } from "react";
import { web3FormsAccessKey } from '../../env.ts';

const ContactForm = () => {
    const accessKey = web3FormsAccessKey;
    const [sumbissionComplete, setSubmissionComplete] = useState(false);
    const [sumbissionError, setSubmissionError] = useState(false);

    const formatData = (form: HTMLFormElement) => {
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        return JSON.stringify(object);
    }

    const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: formatData(form)
            })
            .then(async (response) => {

                const json = await response.json();
                if (response.status === 200) {
                    setSubmissionComplete(true);
                } else {
                    setSubmissionError(true);
                    console.log(json);
                }
            })
            .catch(error => {
                setSubmissionError(true);
                console.log(error);
            })
    }

    return (
        <div className="two-third">
            <p className={`submission-msg ${!sumbissionComplete ? "hidden" : ""}`}>Message Success!  Thanks a lot for you for your interest.  You'll be hearing back from me shortly :&#41;</p>
            <p className={`error-msg ${!sumbissionError ? "hidden" : ""}`}>So Sorry!  There was an error submitting your message.  Please give it another try!</p>
            <form
                className={`contact-form ${sumbissionComplete ? "hidden" : ""}`}
                action="https://api.web3forms.com/submit"
                method="POST"
                onSubmit={handleSubmission}
            >
                <input
                    type="hidden"
                    name="access_key"
                    className="hidden"
                    value={accessKey}
                ></input>
                <input type="checkbox" name="botcheck" className="hidden" disabled={sumbissionComplete}></input>

                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" disabled={sumbissionComplete}></input>

                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" disabled={sumbissionComplete}></input>

                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" id="subject" disabled={sumbissionComplete}></input>

                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" disabled={sumbissionComplete}></textarea>

                <button className="btn-3" type="submit" disabled={sumbissionComplete}>Send</button>
            </form>
        </div>
    );
};

export default ContactForm;
