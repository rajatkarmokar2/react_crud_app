import React,{ useState } from 'react'

const InputError = ( props ) => {

    const [ startshowing,setStartShowing ] = useState( false )

    // const toggleshowing = () => setStartShowing( true )

    // const controlAnimation = () => {
    //     if ( props.message ) {
    //         toggleshowing()
    //         return 'expand-inputerror'
    //     }
    //     if ( startshowing )
    //         return 'expand-inputerror-reverse'
    // }

    return (
        <>
            { props.validatenow && props.message && <p className='text-danger px-1 overflow-hidden position-absolute ' onAnimationStart={ ( e ) => { if ( props.message ) setStartShowing( true ); e.target.style.display = 'block' } } onAnimationEnd={ ( e ) => !props.message && ( e.target.style.display = 'none' ) }
                style={ {
                    transition: 'all 0.3s ',transform: 'perspective(300px) rotateX(20deg) ',
                    backgroundColor: 'lightpink',fontSize: '13px',boxShadow: '0px 8px 1px -5px rgba(0,0,0,.3)',
                    // animation: `${props.validatenow && ( ( props.message && 'expand-inputerror' ) || ( startshowing && 'expand-inputerror-reverse' ) )} 0.5s ease-in-out `,
                    animation: ` expand-inputerror 0.5s ease-in-out `,
                } }>
                { props.message }
            </p> }
        </>
    )
}

export default InputError