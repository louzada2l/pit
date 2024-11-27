import React from 'react';

const InstagramEmbed = () => {
  return (
    <div style={{ margin: '20px 0' }} className='pt-5 pb-5'>
      <iframe allowFullScreen 
        className="instagram-media instagram-media-rendered"
        id="instagram-embed-0"
        src="https://www.instagram.com/bh_next_br/embed/?cr=1&amp;v=14&amp;wp=1440&amp;rd=https%3A%2F%2Faquariumtech.com.br&amp;rp=%2Findex.php#%7B%22ci%22%3A0%2C%22os%22%3A281.7999999523163%2C%22ls%22%3A37.699999928474426%2C%22le%22%3A118.19999992847443%7D"
        allowtransparency="true"
        height="500px"
        data-instgrm-payload-id="instagram-media-payload-0"
        style={{
          width: '100%',
          backgroundColor: '#000',
          borderRadius: '20px',
          border: 'none !important',
          boxShadow: 'none',
          display: 'block',
          margin: '0px 0px 12px',
          minWidth: '326px',
          padding: '0px',
          color: '#fff !important',
          height: "68pc",
        }}
        data-gtm-yt-inspected-9="true"
      ></iframe>
    </div>
  );
};

export default InstagramEmbed;
