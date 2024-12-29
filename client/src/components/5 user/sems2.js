export const generate2 = (year, sem, branch, click = 0) => {


    const sem5 = {
        cse: [
            { id: 'p1', icon: 'AI', title: 'Artificial Intelligence' },
            { id: 'p2', icon: 'SPM', title: '. Software Project Management' },
            { id: 'p3', icon: 'DS', title: 'Distributed Systems' },
            { id: 'p4', icon: 'AUP', title: 'Advanced Unix Programming' },
        ],
        ece: [
            { id: 'p1', icon: 'AWP', title: 'Antenna and Wave Propagation' },
            { id: 'p2', icon: 'EMI', title: 'Electronic Measurements and Instrumentation' },
            { id: 'p3', icon: 'COA', title: 'Computer Architecture & Organization' },
        ],
        it: [
            { id: 'p1', icon: 'CC', title: 'Artificial Intelligence' },
            { id: 'p2', icon: 'DLT', title: 'Agile Software Process' },
            { id: 'p3', icon: 'BCT', title: 'Distributed Systems' },
            { id: 'p4', icon: 'IoT', title: 'Advanced Unix Programming' },
        ],
        mech: [
            { id: 'p1', icon: 'FMM', title: 'Finite Element Methods' },
            { id: 'p2', icon: 'ID', title: 'Industrial Robotics' },
            { id: 'p3', icon: 'AM', title: 'Advanced Materials' },
            { id: 'p4', icon: 'RES', title: 'Renewable Energy Sources' },
            { id: 'p5', icon: 'MoC', title: 'Mechanics of Composites' },
        ],
        civil: [
            { id: 'p1', icon: 'CTM', title: ' Construction Technology & Management' },
            { id: 'p2', icon: 'RSG', title: 'Remote Sensing and GIS' },
            { id: 'p3', icon: 'EIA', title: 'Environmental Impact Assessment' },
            { id: 'p4', icon: 'LCH', title: 'Low Cost Housing' },

        ],
        eee: [
            { id: 'p1', icon: 'LA', title: 'Linear IC Applications' },
            { id: 'p2', icon: 'UEE', title: 'Utilization of Electrical Energy' },
            { id: 'p3', icon: 'CAO', title: 'Computer Architecture and Organization' },
            { id: 'p4', icon: 'OT', title: 'Optimization Techniques' },
            { id: 'p5', icon: 'JAVA', title: 'Object Oriented Programming through Java ' },
        ],
    };
    const sem6 = {
        cse: [
            { id: 'p1', icon: 'MP', title: 'Mobile Computing' },
            { id: 'p2', icon: 'BDA', title: 'Big Data Analytics' },
            { id: 'p3', icon: 'OOAD', title: 'Object Oriented Analysis and Design' },
            { id: 'p4', icon: 'NP', title: 'Network Programming' },
        ],
        ece: [
            { id: 'p1', icon: 'ME', title: 'Microwave Engineering' },
            { id: 'p2', icon: 'MCC', title: 'Mobile & Cellular Communication' },
            { id: 'p3', icon: 'ES', title: 'Embedded Systems' },
            { id: 'p4', icon: 'CMOS', title: 'CMOS Analog IC Design' },
        ],
        it: [
            { id: 'p1', icon: 'MC', title: 'Mobile Computing' },
            { id: 'p2', icon: 'MEAN', title: 'MEAN Stack Development' },
            { id: 'p3', icon: 'DP', title: 'Design Patterns' },
            { id: 'p4', icon: 'SL', title: 'Scripting Languages' },
        ],
        mech: [
            { id: 'p1', icon: 'AE', title: 'Automobile Engineering ' },
            { id: 'p2', icon: 'SM', title: 'Smart Manufacturing' },
            { id: 'p3', icon: 'AMS', title: 'Advanced Mechanics of Solids' },
            { id: 'p4', icon: 'SQC', title: 'Statistical Quality Control' },
            { id: 'p5', icon: 'IHP', title: 'Industrial Hydraulics and Pneumatics' },
        ],
        civil: [
            { id: 'p1', icon: 'ASA', title: ' Advanced Structural Analysis' },
            { id: 'p2', icon: 'ATP', title: 'Architecture and Town Planning ' },
            { id: 'p3', icon: 'RSE', title: 'Road Safety Engineering' },
            { id: 'p4', icon: 'TE', title: 'Traffic Engineering' },
        ],
        eee: [
            { id: 'p1', icon: 'S&S', title: 'Signal and Systems' },
            { id: 'p2', icon: 'ED', title: 'Electric Drives' },
            { id: 'p3', icon: 'ACS', title: 'Advanced Control Systems' },
            { id: 'p4', icon: 'S&P', title: 'Switchgear and Protection' },
            { id: 'p5', icon: 'BDA', title: 'Big Data Analytics' },
        ],
    };
    const sem7 = {
        cse1: [
            { id: 'p1', icon: 'CC', title: 'Cloud Computing' },
            { id: 'p2', icon: 'NNSC', title: 'Neural Networks and Soft Computing' },
            { id: 'p3', icon: 'ASN', title: 'Ad-hoc and Sensor Networks' },
            { id: 'p4', icon: 'CSF', title: 'Cyber Security & Forensics' },
        ],
        cse2: [
            { id: 'p1', icon: 'DLT', title: 'Deep Learning Techniques' },
            { id: 'p2', icon: 'SNSW', title: 'Social Networks & Semantic Web' },
            { id: 'p3', icon: 'CV', title: ' Computer Vision' },
            { id: 'p4', icon: 'MOCS', title: 'MOOCS-NPTEL' },
        ],
        cse3: [
            { id: 'p1', icon: 'BCT', title: 'Block-Chain Technologies' },
            { id: 'p2', icon: 'WNS', title: 'Wireless Network Security' },
            { id: 'p3', icon: 'EH', title: 'Ethical Hacking' },
            { id: 'p4', icon: 'MOCS', title: 'MOOCS-NPTEL' },
        ],
        ece1: [
            { id: 'p1', icon: 'OC', title: ' Optical Communication' },
            { id: 'p2', icon: 'DIP', title: 'Digital Image Processing' },
            { id: 'p3', icon: 'LPD', title: 'Low Power VLSI Design' },
        ],
        ece2: [
            { id: 'p1', icon: 'RE', title: 'Radar engineering' },
            { id: 'p2', icon: 'PRML', title: 'Pattern recognition & Machine Learning' },
            { id: 'p3', icon: 'IoT', title: 'Internet of Things' },
        ],
        ece3: [
            { id: 'p1', icon: 'OC', title: 'Satellite Communications' },
            { id: 'p2', icon: 'SCT', title: 'Soft Computing Techniques' },
            { id: 'p3', icon: 'DDUC', title: 'Digital IC Design using CMOS' },
        ],
        it1: [
            { id: 'p1', icon: 'CC', title: 'Cloud Computing' },
            { id: 'p2', icon: 'ANN', title: 'Artificial Neural Networks' },
            { id: 'p3', icon: 'IoT', title: 'Internet of Things' },
            { id: 'p4', icon: 'CSF', title: 'Cyber Security & Forensics' },
        ],
        it2: [
            { id: 'p1', icon: 'DLT', title: 'Deep Learning Techniques' },
            { id: 'p2', icon: 'SNSW', title: 'Social Networks & Semantic Web' },
            { id: 'p3', icon: 'AD', title: 'Advanced Databases' },
            { id: 'p4', icon: 'MOCS', title: 'MOOCS-NPTEL' },
        ],
        it3: [
            { id: 'p1', icon: 'BCT', title: 'Block-Chain Technologies' },
            { id: 'p2', icon: 'M-C', title: 'M-Commerce' },
            { id: 'p3', icon: 'EH', title: 'Ethical Hacking' },
            { id: 'p4', icon: 'MOCS', title: 'MOOCS-NPTEL' },
        ],
        mech1: [
            { id: 'p1', icon: 'MV', title: 'Mechanical Vibrations' },
            { id: 'p2', icon: 'OR', title: 'Operations Research' },
            { id: 'p3', icon: 'UMP', title: 'Unconventional Machining Processes' },
            { id: 'p4', icon: 'CFD', title: 'Computational Fluid Dynamics' },
            { id: 'p5', icon: 'GDJP', title: 'Gas Dynamics and Jet Propulsion' },
        ],
        mech2: [
            { id: 'p1', icon: 'AM', title: 'Automation in Manufacturing' },
            { id: 'p2', icon: 'PPE', title: 'Power Plant Engineering' },
            { id: 'p3', icon: 'BDA', title: 'Big Data Analytics' },
            { id: 'p4', icon: 'PPC', title: 'Production Planning and Control' },
            { id: 'p5', icon: 'CM', title: 'Condition Monitoring' },
        ],
        mech3: [
            { id: 'p1', icon: 'AMP', title: 'Advanced Manufacturing Processes ' },
            { id: 'p2', icon: 'MECH', title: 'MechatronicS' },
            { id: 'p3', icon: 'R & AC', title: 'Refrigeration & Air-Conditioning' },
            { id: 'p4', icon: 'AM', title: 'Additive Manufacturing' },
            { id: 'p5', icon: 'NDE', title: 'Non Destructive Evaluation' },
        ],
        civil1: [
            { id: 'p1', icon: 'ASE', title: 'Advanced Structural Engineering' },
            { id: 'p2', icon: 'BE', title: 'Bridge Engineering' },
            { id: 'p3', icon: 'SD', title: ' Structural Dynamics' },
            { id: 'p4', icon: 'UTP', title: 'Urban Transportation Planning' },
        ],
        civil2: [
            { id: 'p1', icon: 'GIT', title: 'Ground Improvement Techniques' },
            { id: 'p2', icon: 'GST', title: 'Geo-Spatial Technologies' },
            { id: 'p3', icon: 'DMM', title: 'Disaster Management & Mitigation' },
            { id: 'p4', icon: 'SDMF', title: 'Soil dynamics & Machine Foundations' },
        ],
        civil3: [
            { id: 'p1', icon: 'DDIS', title: 'Design & Drawing of Irrigation Structures' },
            { id: 'p2', icon: 'ERFD', title: ' Earth & Rock fill Dams' },
            { id: 'p3', icon: 'UH', title: 'Urban Hydrology' },
            { id: 'p4', icon: 'MOCS', title: 'MOOCS-NPTEL' },
        ],
        eee1: [
            { id: 'p1', icon: 'DSP', title: 'Digital Signal Processing' },
            { id: 'p2', icon: 'RDET', title: 'Renewable and Distributed Energy Technologies' },
            { id: 'p3', icon: 'FACTS', title: 'Flexible Alternating Current Transmission Systems' },
            { id: 'p4', icon: 'PSD', title: 'Power Systems Deregulation' },
            { id: 'p5', icon: 'DBMS', title: 'Data Base Management Systems' },
        ],
        eee2: [
            { id: 'p1', icon: 'HEV', title: 'Hybrid Electric Vehicles' },
            { id: 'p2', icon: 'HVE', title: 'High Voltage Engineering' },
            { id: 'p3', icon: 'PLCA', title: 'Programmable Logic Controllers and Applications' },
            { id: 'p4', icon: 'AWS', title: 'Cloud Computing with AWS' },
            { id: 'p5', icon: 'DLT', title: 'Deep Learning Techniques' },
        ],
        eee3: [
            { id: 'p1', icon: 'PSOC', title: 'Power System Operation and Control ' },
            { id: 'p2', icon: 'SMPC', title: 'Switched Mode Power Conversion' },
            { id: 'p3', icon: 'AIEE', title: 'AI Applications to Electrical Engineering' },
            { id: 'p4', icon: 'DS', title: 'Data Science' },
            { id: 'p5', icon: 'MEAN', title: 'MEAN Stack Technologies' },
        ],
    };


    switch (year) {
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
        case '4th Year':
            if (sem === 'Semester 1') {
                switch (branch) {
                    case 'CSE':
                        if (click === 0) {
                            return sem7.cse1;
                        }
                        else {
                            switch (click) {
                                case 1:
                                    return sem7.cse1;
                                case 2:
                                    return sem7.cse2;
                                case 3:
                                    return sem7.cse3;
                                default:
                                    return
                            }
                        }
                    case 'ECE':
                        if (click === 0) {
                            return sem7.ece1;
                        }
                        else {
                        switch (click) {
                            case 1:
                                return sem7.ece1;
                            case 2:
                                return sem7.ece2;
                            case 3:
                                return sem7.ece3;
                            default:
                                return
                        }
                    }
                    case 'IT':
                        if (click === 0) {
                            return sem7.it1;
                        }
                        else {
                        switch (click) {
                            case 1:
                                return sem7.it1;
                            case 2:
                                return sem7.it2;
                            case 3:
                                return sem7.it3;
                            default:
                                return
                        }
                    }
                    case 'MECH':
                        if (click === 0) {
                            return sem7.mech1;
                        }
                        else {
                        switch (click) {
                            case 1:
                                return sem7.mech1;
                            case 2:
                                return sem7.mech2;
                            case 3:
                                return sem7.mech3;
                            default:
                                return
                        }
                    }
                    case 'CIVIL':
                        if (click === 0) {
                            return sem7.civil1;
                        }
                        else {
                        switch (click) {
                            case 1:
                                return sem7.civil1;
                            case 2:
                                return sem7.civil2;
                            case 3:
                                return sem7.civil3;
                            default:
                                return
                        }
                    }
                    case 'EEE':
                        if (click === 0) {
                            return sem7.eee1;
                        }
                        else {
                        switch (click) {
                            case 1:
                                return sem7.eee1;
                            case 2:
                                return sem7.eee2;
                            case 3:
                                return sem7.eee3;
                            default:
                                return
                        }
                    }
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
