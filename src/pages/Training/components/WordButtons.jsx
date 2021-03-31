const WordButtons = ({ setWordHard, removeWord, showControl }) => {
    return (
        <>
            <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0.46875C6.97518 0.46875 0.46875 6.97752 0.46875 15C0.46875 23.0272 6.97518 29.5312 15 29.5312C23.0248 29.5312 29.5312 23.0272 29.5312 15C29.5312 6.97752 23.0248 0.46875 15 0.46875ZM15 6.91406C16.3591 6.91406 17.4609 8.01586 17.4609 9.375C17.4609 10.7341 16.3591 11.8359 15 11.8359C13.6409 11.8359 12.5391 10.7341 12.5391 9.375C12.5391 8.01586 13.6409 6.91406 15 6.91406ZM18.2812 21.7969C18.2812 22.1852 17.9664 22.5 17.5781 22.5H12.4219C12.0336 22.5 11.7188 22.1852 11.7188 21.7969V20.3906C11.7188 20.0023 12.0336 19.6875 12.4219 19.6875H13.125V15.9375H12.4219C12.0336 15.9375 11.7188 15.6227 11.7188 15.2344V13.8281C11.7188 13.4398 12.0336 13.125 12.4219 13.125H16.1719C16.5602 13.125 16.875 13.4398 16.875 13.8281V19.6875H17.5781C17.9664 19.6875 18.2812 20.0023 18.2812 20.3906V21.7969Z" fill="#272C36" />
            </svg>
            { showControl &&
                <>
                    <svg onClick={setWordHard} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.02778 0C7.73003 0 6.65365 1.00098 6.34549 2.35352C6.31076 2.35352 6.28472 2.34375 6.25 2.34375C4.71788 2.34375 3.47222 3.74512 3.47222 5.46875C3.47222 5.70312 3.49826 5.93262 3.54601 6.15234C2.27865 6.73828 1.38889 8.13477 1.38889 9.76562C1.38889 10.3809 1.52778 10.9521 1.74913 11.4697C0.707465 12.1436 0 13.3936 0 14.8438C0 16.4697 0.885417 17.8662 2.1441 18.4521C2.10503 18.6768 2.08333 18.9062 2.08333 19.1406C2.08333 21.084 3.4809 22.6562 5.20833 22.6562C5.38628 22.6562 5.5599 22.6318 5.72917 22.5977C6.14583 23.9893 7.30035 25 8.68056 25C10.408 25 11.8056 23.4277 11.8056 21.4844V3.125C11.8056 1.40137 10.5599 0 9.02778 0ZM25 14.8438C25 13.3936 24.2925 12.1436 23.2509 11.4697C23.4766 10.9521 23.6111 10.3809 23.6111 9.76562C23.6111 8.13477 22.7214 6.73828 21.454 6.15234C21.4974 5.93262 21.5278 5.70312 21.5278 5.46875C21.5278 3.74512 20.2821 2.34375 18.75 2.34375C18.7153 2.34375 18.6849 2.35352 18.6545 2.35352C18.3464 1.00098 17.27 0 15.9722 0C14.4401 0 13.1944 1.39648 13.1944 3.125V21.4844C13.1944 23.4277 14.592 25 16.3194 25C17.6997 25 18.8542 23.9893 19.2708 22.5977C19.4401 22.6318 19.6137 22.6562 19.7917 22.6562C21.5191 22.6562 22.9167 21.084 22.9167 19.1406C22.9167 18.9062 22.895 18.6768 22.8559 18.4521C24.1146 17.8662 25 16.4697 25 14.8438Z" fill="#272C36" />
                    </svg>
                    <svg onClick={removeWord} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.1071 1.56229H17.4107L16.8862 0.649202C16.775 0.453994 16.6039 0.289789 16.3919 0.17506C16.18 0.0603314 15.9356 -0.000369102 15.6864 -0.000212692H9.30804C9.05936 -0.00104914 8.81545 0.0594251 8.60424 0.174281C8.39304 0.289138 8.22308 0.45373 8.11384 0.649202L7.58929 1.56229H0.892857C0.656057 1.56229 0.428955 1.6446 0.261512 1.79111C0.0940686 1.93762 0 2.13634 0 2.34354L0 3.90604C0 4.11324 0.0940686 4.31196 0.261512 4.45847C0.428955 4.60498 0.656057 4.68729 0.892857 4.68729H24.1071C24.3439 4.68729 24.571 4.60498 24.7385 4.45847C24.9059 4.31196 25 4.11324 25 3.90604V2.34354C25 2.13634 24.9059 1.93762 24.7385 1.79111C24.571 1.6446 24.3439 1.56229 24.1071 1.56229ZM2.96875 22.8025C3.01134 23.3976 3.31147 23.956 3.80807 24.3642C4.30466 24.7725 4.96038 24.9997 5.64174 24.9998H19.3583C20.0396 24.9997 20.6953 24.7725 21.1919 24.3642C21.6885 23.956 21.9887 23.3976 22.0312 22.8025L23.2143 6.24979H1.78571L2.96875 22.8025Z" fill="#272C36" />
                    </svg>
                </>
            }
        </>
    )
}
export default WordButtons