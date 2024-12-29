export const uploadsubject = (year, sem, branch) => {
    const sem1 = {
        cse: ['ENGLISH', 'M-I','PHYSICS', 'C', 'CEW'],
        ece: ['ENGLISH', 'M-I', 'PHYSICS', 'C', 'Eng Drawing'],
        it: ['ENGLISH', 'M-I', 'PHYSICS', 'C', 'CEW'],
        mech: ['M-I', 'Eng PHYSICS', 'PPS', 'ENGLISH', 'Eng Drawing'],
        civil: ['M-I', 'ENGLISH', 'Eng Physics', 'Eng Drawing', 'Eng Geology'],
        eee: ['ENGLISH', 'M-I', 'M-II', 'C', 'Eng DD'],
    };
    const sem2 = {
        cse: ['M–II', 'CHEMISTRY', 'CO', 'PYTHON', 'DS'],
        ece: ['M–II', 'PHYSICS', 'Java', 'NA', 'BEE'],
        it: ['M–II',  'CHEMISTRY', 'CO', 'PYTHON', 'DS'],
        mech: ['M-II', 'Eng Chemistry', 'Eng Mechanics', 'BEEE', 'CAED'],
        civil: ['M–II', 'Eng Chemistry', 'Eng Mechanics', 'C', 'BMCT'],
        eee: ['M-III', 'PHYSICS', 'C', 'ECA-I', 'BCME'],
    };
    const sem3 = {
        cse: ['M-III', 'C++', 'OS', 'SE', 'MFCS'],
        ece: ['EDC', 'STLD', 'SS', 'M-III', 'RVSP'],
        it: ['M-III', 'C++', 'OS', 'DBMS', 'DMGT'],
        mech: ['VCFT and PDE(M-III)', 'MS','FM&HM', 'PT', 'KM'],
        civil: ['M-III', 'SM-I', 'FM', 'SG', 'HE'],
        eee: ['M-IV', 'EDC', 'ECA–II', 'DCMT', 'EMF'],
    };
    const sem4 = {
        cse: ['P&S', 'DBMS', 'FLAT', 'JAVA', 'MEFA'], 
        ece: ['ECA', 'DICD', 'AC', 'LCS', 'MOB'],
        it: [ 'SR', 'PSE', 'ATCD', 'JAVA', 'MEFA'],
        mech: ['MSM', 'CVSM', 'DM', 'TE-I ', 'IEM'],
        civil: ['CVSM', 'SM-II', 'HHM', 'EE', 'MEFA'],
        eee: ['PYTHON', 'DE', 'PS-I', 'ISM', 'MEFA'],
    };
    const sem5 = {
        cse: ['CN', 'DAA', 'DWDM', 'AI', 'SPM', 'DS', 'AUP'],
        ece: ['AICAP', 'EWTL', 'DC'],    
        it: ['CN', 'DAA', 'DMT'],
        mech: ['TE-II', 'DMM-I', 'MMTM'],
        civil: ['SA', 'DDRCS', 'GE-I'],
        eee: ['PS-II', 'PE', 'CS']
    };
    const sem6 = {
        cse: ['ML','CD','CNS', 'MP', 'BDA', 'OOAD', 'NP'],
        ece: ['MM','VLSI','DSP', 'ME', 'MCC', 'ES', 'CMOS'],
        it: ['ML','BDA','CNS', 'MC', 'MEAN', 'DP', 'SL'],
        mech: ['HT','DMM2','IAI','AE', 'SM', 'AMS','SQC', 'IHP'],
        civil: ['DDSS','WRE','GE2','ASA', 'ATP', 'RSE', 'TE',],
        eee: [ 'M&M','EMI','PSA','S&S', 'ED', 'ACS', 'S&P', 'BDA'],
    };
    const sem7 = {
        cse: ['CC','NNSC','ASN','CSF','DLT','SNSW','CV', 'MOCS','BCT','WNS','EH','MOCS', ],
        ece: ['OC','DIP','LPD','RE','PRML','IoT','SC','SCT','DDUC',],
        it: ['CC', 'ANN','IoT','CSF','DLT','SNSW','MOCS','AD', 'BCT','M-C','EH','MOCS'],
        mech: ['MV', 'OR','UMP','CFD','GDJP','AM','PPE','BDA','PPC','CM','AMP','MECH','R & AC','AM','AM','NDE'],
        civil: ['ASE','BE','SD','UTP','GIT','GST','DMM','SDMF','DDIS','ERFD','UH','MOCS'],
        eee: ['DSP','RDET','FACTS','PSD','DBMS','HEV','HVE','PLCA','AWS','DLT','PSOC','SMPC','AIEE', 'DS','MEAN'],
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
            case '4th Year':
                if (sem === 'Semester 1') {
                    switch (branch) {
                        case 'CSE':
                            return sem7.cse;
                        case 'ECE':
                            return sem7.ece;
                        case 'IT':
                            return sem7.it;
                        case 'MECH':
                            return sem7.mech;
                        case 'CIVIL':
                            return sem7.civil;
                        case 'EEE':
                            return sem7.eee;
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
