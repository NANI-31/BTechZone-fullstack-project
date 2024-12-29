export const generate = (year, sem, branch) => {
    const sem1 = {
        cse: [
            { id: 'c1', icon: 'ENG', title: 'ENGLISH' },
            { id: 'c2', icon: 'M1', title: 'Mathematics - I' },
            { id: 'c3', icon: 'PHY', title: 'Applied Physics' },
            { id: 'c4', icon: 'C', title: 'Programming for Problem Solving using C' },
            { id: 'c5', icon: 'CEW', title: 'Computer Engineering Workshop' },
        ],
        ece: [
            { id: 'c1', icon: 'ENG', title: 'ENGLISH' },
            { id: 'c2', icon: 'M1', title: 'Mathematics - I' },
            { id: 'c3', icon: 'CHEM', title: 'Applied Physics' },
            { id: 'c4', icon: 'C', title: 'Programming for Problem Solving using C' },
            { id: 'c5', icon: 'ED', title: 'Engineering Drawing' },
        ],
        it: [
            { id: 'c1', icon: 'ENG', title: 'ENGLISH' },
            { id: 'c2', icon: 'M1', title: 'Mathematics - I' },
            { id: 'c3', icon: 'PHY', title: 'Applied Physics' },
            { id: 'c4', icon: 'C', title: 'Programming for Problem Solving using C' },
            { id: 'c5', icon: 'CEW', title: 'Computer Engineering Workshop' },
        ],
        mech: [
            { id: 'c1', icon: 'M1', title: 'Calculus & Differential Equations-M1' },
            { id: 'c2', icon: 'EP', title: 'Engineering Physics' },
            { id: 'c3', icon: 'PPS', title: 'Programming for Problem Solving' },
            { id: 'c4', icon: 'ENG', title: 'English' },
            { id: 'c5', icon: 'ED', title: 'Engineering Drawing' },
        ],
        civil: [
            { id: 'c1', icon: 'M1', title: 'Mathematics - I' },
            { id: 'c2', icon: 'ENG', title: 'ENGLISH' },
            { id: 'c3', icon: 'PHY', title: 'Engineering Physics' },
            { id: 'c4', icon: 'ED', title: 'Engineering Drawing' },
            { id: 'c5', icon: 'EG', title: 'Engineering Geology' },
        ],
        eee: [
            { id: 'c1', icon: 'ENG', title: 'ENGLISH' },
            { id: 'c2', icon: 'M1', title: 'Mathematics - I' },
            { id: 'c3', icon: 'M2', title: 'Mathematics - II' },
            { id: 'c4', icon: 'C', title: 'Programming for Problem Solving Using C' },
            { id: 'c5', icon: 'EDD', title: 'Engineering Drawing & Design' },
        ],
    };
    const sem2 = {
        cse: [
            { id: 'c1', icon: 'M2', title: 'Mathematics – II' },
            { id: 'c2', icon: 'CHEM', title: 'Applied Chemistry' },
            { id: 'c3', icon: 'CO', title: 'Computer Organization ' },
            { id: 'c4', icon: 'PP', title: 'Python Programming' },
            { id: 'c5', icon: 'DS', title: 'Data Structures' },
        ],
        ece: [
            { id: 'c1', icon: 'M2', title: 'Mathematics – II' },
            { id: 'c2', icon: 'PHY  ', title: 'Applied Physics' },
            { id: 'c3', icon: 'JAVA', title: 'Object Oriented Programming through Java' },
            { id: 'c4', icon: 'NA', title: 'Network Analysis' },
            { id: 'c5', icon: 'BEE', title: 'Basic Electrical Engineering' },
        ],
        it: [
            { id: 'c1', icon: 'M2', title: 'Mathematics – II' },
            { id: 'c2', icon: 'CHEM', title: 'Applied Chemistry' },
            { id: 'c3', icon: 'CO', title: 'Computer Organization ' },
            { id: 'c4', icon: 'PP', title: 'Python Programming' },
            { id: 'c5', icon: 'DD', title: 'Data Structures' },
        ],
        mech: [
            { id: 'c1', icon: 'M2', title: 'Linear Algebra & Numerical Methods-M2' },
            { id: 'c2', icon: 'EC', title: 'Engineering Chemistry' },
            { id: 'c3', icon: 'EM', title: 'Engineering Mechanics' },
            { id: 'c4', icon: 'BEEE', title: 'Basic Electrical & Electronics Engineering' },
            { id: 'c5', icon: 'CAED', title: 'Computer Aided Engineering Drawing' },
        ],
        civil: [
            { id: 'c1', icon: 'M2', title: 'Mathematics – II' },
            { id: 'c2', icon: 'CHEM', title: 'Engineering Chemistry' },
            { id: 'c3', icon: 'EM', title: 'Engineering Mechanics' },
            { id: 'c4', icon: 'C', title: 'Programming for Problem Solving Using C' },
            { id: 'c5', icon: 'BMCT', title: 'Building Materials and Concrete Technology' },
        ],
        eee: [
            { id: 'c1', icon: 'M3', title: 'Mathematics-III' },
            { id: 'c2', icon: 'PHY', title: 'Applied Physics' },
            { id: 'c3', icon: 'DSC', title: 'Data Structures Through C' },
            { id: 'c4', icon: 'ECA-I', title: 'Electrical Circuit Analysis -I' },
            { id: 'c5', icon: 'BCME', title: 'Basic Civil and Mechanical Engineering' },
        ],
    };
    const sem3 = {
        cse: [
            { id: 'c1', icon: 'M3', title: 'Mathematics III' },
            { id: 'c2', icon: 'C++', title: 'Object Oriented Programming through C++' },
            { id: 'c3', icon: 'OS', title: 'Operating Systems' },
            { id: 'c4', icon: 'SE', title: 'Software Engineering' },
            { id: 'c5', icon: 'MFCS', title: 'Mathematical Foundations of Computer Science' },
        ],
        ece: [
            { id: 'c1', icon: 'EDC', title: 'Electronic Devices and Circuits ' },
            { id: 'c2', icon: 'STLD', title: 'Switching Theory and Logic Design' },
            { id: 'c3', icon: 'SS', title: 'Signals and Systems' },
            { id: 'c4', icon: 'M3', title: 'Mathematics-III (Transforms and Vector Calculus)' },
            { id: 'c5', icon: 'RVSP', title: 'Random Variables and Stochastic Processes' },
        ],
        it: [
            { id: 'c1', icon: 'M3', title: 'Mathematics III' },
            { id: 'c2', icon: 'C++', title: 'Object Oriented Programming through C++' },
            { id: 'c3', icon: 'OS', title: 'Operating Systems' },
            { id: 'c4', icon: 'DBMS', title: 'Database Management Systems' },
            { id: 'c5', icon: 'DMGT', title: 'Discrete Mathematics and Graph Theory' },
        ],
        mech: [
            { id: 'c1', icon: 'M3', title: 'Vector Calculus, Fourier Transforms and PDE' },
            { id: 'c2', icon: 'MS', title: 'Mechanics of Solids' },
            { id: 'c3', icon: 'FMHM', title: 'Fluid Mechanics & Hydraulic Machines' },
            { id: 'c4', icon: 'PT', title: 'Production Technology' },
            { id: 'c5', icon: 'KM', title: 'Kinematics of Machinery' },
        ],
        civil: [
            { id: 'c1', icon: 'M3', title: 'Mathematics -III' },
            { id: 'c2', icon: 'SM1', title: 'Strength of Materials - I' },
            { id: 'c3', icon: 'FM', title: 'Fluid Mechanics' },
            { id: 'c4', icon: 'SG', title: 'Surveying and Geometrics' },
            { id: 'c5', icon: 'HE', title: 'Highway Engineering' },
        ],
        eee: [
            { id: 'c1', icon: 'M4', title: 'Mathematics– IV' },
            { id: 'c2', icon: 'EDC', title: 'Electronic Devices and Circuits' },
            { id: 'c3', icon: 'ECA2', title: 'Electrical Circuit Analysis –II' },
            { id: 'c4', icon: 'DCMT', title: 'DC Machines and Transformers' },
            { id: 'c5', icon: 'EMF', title: 'Electro Magnetic Fields' },
        ],
    };
    const sem4 = {
        cse: [
            { id: 'c1', icon: 'P&S', title: 'Probability and Statistics ' },
            { id: 'c2', icon: 'DBMS', title: 'Database Management Systems ' },
            { id: 'c3', icon: 'FLAT', title: 'Formal Languages and Automata Theory ' },
            { id: 'c4', icon: 'JAVA', title: 'Java Programming' },
            { id: 'c5', icon: 'MEFA', title: 'Managerial Economics and Financial Accountancy ' },
        ],
        ece: [
            { id: 'c1', icon: 'ECA', title: 'Electronic Circuit Analysis' },
            { id: 'c2', icon: 'DICD', title: 'Digital IC Design' },
            { id: 'c3', icon: 'AC', title: 'Analog Communications' },
            { id: 'c4', icon: 'LCS', title: 'Linear control Systems' },
            { id: 'c5', icon: 'MOB', title: 'Management and Organizational Behavior' }, 
        ],
        it: [
            { id: 'c1', icon: 'SR', title: 'Statistics with R' },
            { id: 'c2', icon: 'PSE', title: 'Principles of Software Engineering' },
            { id: 'c3', icon: 'ATCD', title: 'Automata Theory and Compiler Design' },
            { id: 'c4', icon: 'JAVA', title: 'Java Programming' },
            { id: 'c5', icon: 'MEFA', title: 'Managerial Economics and Financial Accountancy ' },
        ],
        mech: [
            { id: 'c1', icon: 'MSM', title: 'Material Science & Metallurgy' },
            { id: 'c2', icon: 'CVSM', title: 'Complex Variables and Statistical Methods' },
            { id: 'c3', icon: 'DM', title: 'Dynamics of Machinery' },
            { id: 'c4', icon: 'TE1', title: 'Thermal Engineering-I ' },
            { id: 'c5', icon: 'IEM', title: 'Industrial Engineering and Management' },
        ],
        civil: [
            { id: 'c1', icon: 'CVSM', title: 'Complex Variables and Statistical Methods' },
            { id: 'c2', icon: 'SM2', title: 'Strength of Materials -II' },
            { id: 'c3', icon: 'HHM', title: 'Hydraulics and Hydraulic Machinery' },
            { id: 'c4', icon: 'EE', title: 'Environmental Engineering' },
            { id: 'c5', icon: 'MEFA', title: 'Managerial Economics & Financial Analysis ' },
        ],
        eee: [
            { id: 'c1', icon: 'PP', title: 'Python Programming' },
            { id: 'c2', icon: 'DE', title: 'Digital Electronics' },
            { id: 'c3', icon: 'PS1', title: 'Power System-I' },
            { id: 'c4', icon: 'ISM', title: 'Induction and Synchronous Machines' },
            { id: 'c5', icon: 'MEFA', title: 'Managerial Economics & Financial Analysis' },
        ],
    };
    const sem5 = {
        cse: [
            { id: 'c1', icon: 'CN', title: 'Computer Networks' },
            { id: 'c2', icon: 'DAA', title: 'Design and Analysis of Algorithms' },
            { id: 'c3', icon: 'DWDM', title: 'Data Warehousing and Data Mining' },
        ],
        ece: [
            { id: 'c1', icon: 'AICAP', title: 'Analog ICs and Applications' },
            { id: 'c2', icon: 'EWTL', title: 'Electromagnetic Waves and Transmission Lines' },
            { id: 'c3', icon: 'DC', title: 'Digital Communications' },
        
        ],
        it: [
            { id: 'c1', icon: 'CN', title: 'Computer Networks' },
            { id: 'c2', icon: 'DAA', title: 'Design and Analysis of Algorithms' },
            { id: 'c3', icon: 'DMT', title: 'Data Mining Techniques' },
            
        ],
        mech: [
            { id: 'c1', icon: 'TE2', title: 'Thermal Engineering-II ' },
            { id: 'c2', icon: 'DMM1', title: 'Design of Machine Members-I' },
            { id: 'c3', icon: 'MMTM', title: 'Machining, Machine Tools & Metrology' },
        ],
        civil: [
            { id: 'c1', icon: 'SA', title: 'Structure Analysis' },
            { id: 'c2', icon: 'DDRCS', title: 'DESIGN AND DRAWING OF REINFORCED CONCRETE STRUCTURES' },
            { id: 'c3', icon: 'GE1', title: 'GEOTECHNICAL ENGINEERING-1' },
            
        ],
        eee: [
            { id: 'c1', icon: 'PS2', title: 'Power Systems-II' },
            { id: 'c2', icon: 'PE', title: 'Power Electronics' },
            { id: 'c3', icon: 'CS', title: 'Control Systems' },
            
        ],
    };
    const sem6 = {
        cse: [
            { id: 'c1', icon: 'ML', title: 'Machine Learning' },
            { id: 'c2', icon: 'CD', title: 'Compiler Design' },
            { id: 'c3', icon: 'CNS', title: 'Cryptography & Network Security' },
            
        ],
        ece: [
            { id: 'c1', icon: 'MM', title: 'Microprocessor and Microcontrollers' },
            { id: 'c2', icon: 'VLSI', title: 'VLSI Design' },
            { id: 'c3', icon: 'DSP', title: 'Digital Signal Processing' },
            
        ],
        it: [
            { id: 'c1', icon: 'ML', title: 'Machine Learning' },
            { id: 'c2', icon: 'BDA', title: 'Big Data Analytics' },
            { id: 'c3', icon: 'CNS', title: 'Cryptography & Network Security' },
            
        ],
        mech: [
            { id: 'c1', icon: 'HT', title: 'Heat Transfer' },
            { id: 'c2', icon: 'DMM2', title: 'Design of Machine Members-II' },
            { id: 'c3', icon: 'IAI', title: 'Introduction to Artificial Intelligence and Machine Learning' },
        ],
        civil: [
            { id: 'c1', icon: 'DDSS', title: 'DESIGN AND DRAWING OF STEEL STRUCTURES' },
            { id: 'c2', icon: 'WRE', title: 'WATER RESOURCE ENGINEERING' },
            { id: 'c3', icon: 'GE2', title: '(GEOTECHNICAL ENGINEERING-II' },
            
        ],
        eee: [
            { id: 'c1', icon: 'M&M', title: 'Microprocessors and Microcontrollers' },
            { id: 'c2', icon: 'EMI', title: 'Electrical Measurements and Instrumentation' },
            { id: 'c3', icon: 'PSA', title: 'Power System Analysis' },
            
        ],
    };















    switch (year) {
        case '1st Year':
            if (sem === 'Semester 1') {
                switch (branch) {
                    case 'CSE':
                        return sem1.cse;
                    case 'ECE':
                        return sem1.ece;
                    case 'IT':
                        return sem1.it;
                    case 'MECH':
                        return sem1.mech;
                    case 'CIVIL':
                        return sem1.civil;
                    case 'EEE':
                        return sem1.eee;
                    default:
                        break;


                }
            } else {
                switch (branch) {
                    case 'CSE':
                        return sem2.cse;
                    case 'ECE':
                        return sem2.ece;
                    case 'IT':
                        return sem2.it;
                    case 'MECH':
                        return sem2.mech;
                    case 'CIVIL':
                        return sem2.civil;
                    case 'EEE':
                        return sem2.eee;
                    default:
                        break;

                }
            }
            break;
        case '2nd Year':
            if (sem === 'Semester 1') {
                switch (branch) {
                    case 'CSE':
                        return sem3.cse;
                    case 'ECE':
                        return sem3.ece;
                    case 'IT':
                        return sem3.it;
                    case 'MECH':
                        return sem3.mech;
                    case 'CIVIL':
                        return sem3.civil;
                    case 'EEE':
                        return sem3.eee;
                    default:
                        break;


                }
            } else {
                switch (branch) {
                    case 'CSE':
                        return sem4.cse;
                    case 'ECE':
                        return sem4.ece;
                    case 'IT':
                        return sem4.it;
                    case 'MECH':
                        return sem4.mech;
                    case 'CIVIL':
                        return sem4.civil;
                    case 'EEE':
                        return sem4.eee;
                    default:
                        break;

                }
            }
            break;
        case '3rd Year':
            if (sem === 'Semester 1') {
                switch (branch) {
                    case 'CSE':
                        return sem5.cse;
                    case 'ECE':
                        return sem5.ece;
                    case 'IT':
                        return sem5.it;
                    case 'MECH':
                        return sem5.mech;
                    case 'CIVIL':
                        return sem5.civil;
                    case 'EEE':
                        return sem5.eee;
                    default:
                        break;


                }
            } else {
                switch (branch) {
                    case 'CSE':
                        return sem6.cse;
                    case 'ECE':
                        return sem6.ece;
                    case 'IT':
                        return sem6.it;
                    case 'MECH':
                        return sem6.mech;
                    case 'CIVIL':
                        return sem6.civil;
                    case 'EEE':
                        return sem6.eee;
                    default:
                        break;

                }
            }
            break;

            


        default:
            // Handle other cases if needed
            break;
    }
}
