import { useEffect, useState } from "react";

export type FormEventT =  'pending' | 'error' | 'submitted';

type ContactFormComponentProps = {
  onFormStateChange: (formEvent: FormEventT) => void
};

const ContactForm = ({onFormStateChange}: ContactFormComponentProps) => {
    const accessKey = '0172a4b7-83eb-46cf-aed1-2ce6809204a7';
    const [sumbissionComplete, setSubmissionComplete] = useState(false);
    const [sumbissionError, setSubmissionError] = useState(false);

    useEffect(() => {
        if (sumbissionComplete) {
            onFormStateChange('submitted');
        } else if (sumbissionError) {
            onFormStateChange('error');
        }
    }, [onFormStateChange, sumbissionComplete, sumbissionError]);

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
                if (response.status === 200) {
                    setSubmissionError(false);
                    setSubmissionComplete(true);
                } else {
                    setSubmissionError(true);
                }
            })
            .catch(() => {
                setSubmissionError(true);
            })
    }

    return (
        <div className="two-third">
            <p className={`submission-msg ${!sumbissionComplete ? "hidden" : ""}`}>Message Success!  Thanks a lot for your interest.  You'll be hearing back from me soon :&#41;</p>
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
                <input type="text" name="name" id="name" disabled={sumbissionComplete} required></input>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" disabled={sumbissionComplete} required></input>

                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" id="subject" disabled={sumbissionComplete} required></input>

                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" disabled={sumbissionComplete} required></textarea>

                <button className="btn-submit" type="submit" disabled={sumbissionComplete}>Send</button>
            </form>
        </div>
    );
};

export default ContactForm;
