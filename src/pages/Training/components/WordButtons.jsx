
const WordButtons = ({ setWordHard, removeWord, recoverWord, showRecover, showControl }) => {
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
            {showRecover &&
                <>
                    <svg onClick={recoverWord} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.4302 -7.25606e-06H22.1152C22.0359 -9.68207e-05 21.9574 0.0159299 21.8844 0.047101C21.8114 0.0782722 21.7456 0.123938 21.6908 0.18133C21.636 0.238722 21.5934 0.306644 21.5657 0.380977C21.5379 0.455311 21.5255 0.534506 21.5293 0.613762L21.7246 4.65478C20.589 3.31664 19.1756 2.24198 17.5825 1.50557C15.9894 0.769159 14.255 0.388685 12.5 0.390618C5.82715 0.390618 0.385745 5.83642 0.390628 12.5093C0.395511 19.1929 5.81543 24.6094 12.5 24.6094C15.4986 24.6136 18.3913 23.5011 20.6143 21.4888C20.6736 21.4356 20.7216 21.3709 20.7551 21.2986C20.7886 21.2263 20.807 21.1479 20.8092 21.0683C20.8114 20.9886 20.7973 20.9093 20.7678 20.8353C20.7384 20.7613 20.6941 20.694 20.6377 20.6377L18.9775 18.9775C18.8725 18.8725 18.7314 18.8113 18.5829 18.8063C18.4345 18.8013 18.2896 18.8529 18.1777 18.9507C16.866 20.1048 15.2335 20.8317 13.4981 21.0343C11.7627 21.237 10.0067 20.9059 8.46427 20.0852C6.92182 19.2644 5.66619 17.993 4.86477 16.4404C4.06334 14.8879 3.7542 13.1279 3.97855 11.3951C4.20291 9.66238 4.9501 8.03917 6.12051 6.7419C7.29093 5.44463 8.82896 4.53494 10.5296 4.13409C12.2302 3.73324 14.0126 3.86028 15.6392 4.49828C17.2657 5.13628 18.6592 6.25492 19.6338 7.70507L14.6763 7.46728C14.597 7.46351 14.5178 7.47588 14.4435 7.50363C14.3692 7.53139 14.3012 7.57395 14.2438 7.62874C14.1865 7.68353 14.1408 7.7494 14.1096 7.82237C14.0784 7.89533 14.0624 7.97387 14.0625 8.05322V10.3682C14.0625 10.5236 14.1242 10.6726 14.2341 10.7825C14.344 10.8924 14.493 10.9541 14.6484 10.9541H24.4302C24.5856 10.9541 24.7346 10.8924 24.8445 10.7825C24.9544 10.6726 25.0161 10.5236 25.0161 10.3682V0.58593C25.0161 0.43053 24.9544 0.281494 24.8445 0.17161C24.7346 0.0617253 24.5856 -7.25606e-06 24.4302 -7.25606e-06Z" fill="#272C36" />
                    </svg>
                </>
            }
        </>
    )
}
export default WordButtons