import PersonalizedAesthetics from '@/components/sections/PersonalizedAesthetics'
import PersonalizedAnalysis from '@/components/sections/PersonalizedAnalysis'

const page = () => {
    return (
        <div id='main-page'>
            <PersonalizedAnalysis />
            <PersonalizedAesthetics />
        </div>
    )
}

export default page