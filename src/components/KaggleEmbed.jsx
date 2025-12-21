import React from 'react';

const KaggleEmbed = () => {
    return (
        <div className="w-full h-full flex justify-center">
            <iframe
                src="https://www.kaggle.com/embed/nssuwan/notebookf9ec95de83?cellIds=1&kernelSessionId=287576894"
                className="w-full max-w-[950px] aspect-[950/300]"
                height="300"
                style={{ margin: '0 auto' }}
                frameBorder="0"
                scrolling="auto"
                title="notebookf9ec95de83"
            />
        </div>
    );
};

export default KaggleEmbed;
