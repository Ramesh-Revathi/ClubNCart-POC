import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PrivacyPolicyWrapper } from './PrivacyPolicy.styled';

interface PrivacyPolicyProps {}

const PrivacyPolicy: FC<PrivacyPolicyProps> = () => {
  return (
    <PrivacyPolicyWrapper data-testid="PrivacyPolicy">
      <div>
        <div className="bg-white p-3 shadow-md">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Link
                className="text-gray-700"
                style={{ textDecoration: 'none' }}
                to={`/`}
              >
                <ArrowBackIcon />
              </Link>
              <h5>Privacy Policy</h5>
            </div>
            <SearchIcon />
          </div>
        </div>

        <div className="p-3">
          <p>
            ClubNCart Private Limited (hereinafter referred to as "
            Company/us") respects your privacy, cares about the way in which
            your Personal Data/Information is treated and is committed to
            protecting your Personal Information/Data.
          </p>

          <p>
            This privacy statement of the Company sets forth the security
            practices and procedures adopted by us and applies to the
            collection, storage, use, processing and disclosure of Personal
            Information (defined here in below) provided by you in your capacity
            as customer, employees, trainees, staff, business partners or as
            user or visitor of the Company's website.
          </p>
          <p className="font-bold text-lg">
            Personal Information or Personal Data{' '}
          </p>
          <p className="text-md">(used interchangeably) means and includes</p>
          <ul className="list-decimal list-outside">
            <li>
              Any personal information relating to you as a natural person
              which, either directly or indirectly in combination with other
              information available is capable of identifying such a person and
              includes, inter alia, your name, age, gender, photo, location
              data, phone number and address etc.,
            </li>
            <li>
              sensitive personal data or information including medical records
              and history, financial information such as bank account or credit
              card or debit card details, sexual orientation, biometric
              information, passwords, physical, physiological and mental health
              conditions etc. other than information that is freely available or
              accessible in public domain or furnished under the Right to
              Information Act, 2005 or any other law for the time being in
              force.
            </li>
          </ul>
          <p>
            The Company has taken all necessary and reasonable measures to
            protect the confidentiality of your information and its transmission
            through the worldwide web / internet. However, the Company or any of
            its associates/employees/partners cannot be held liable for
            disclosure of the confidential information when collected in
            accordance with this privacy policy or in terms of any agreements.
            In the course of using this website or availing the services, the
            Company and its affiliates may become privy to the Personal
            Information of its customers, including information that is of a
            confidential nature.
          </p>
          <p>
            In addition to the disclosures reasonably necessary for the purposes
            identified herein, the Company may disclose your Personal
            Information to the extent that it is required to do so by law, in
            connection with any legal proceedings or prospective legal
            proceedings, and in order to establish, exercise or defend its legal
            rights.
          </p>

          <p className="font-bold text-lg">Securing Your Data</p>
          <p>
            Company takes reasonable technical and organizational precautions,
            at the minimum those mandated under applicable law, to prevent the
            loss, misuse or alteration of your Personal Information. The Company
            stores all the Personal Information you provide on its secure
            servers.
          </p>
          <p className="font-bold text-lg">Updating this statement</p>
          <p>
            The Company may update this privacy policy by posting a new version
            on this website. You should check this page regularly to ensure you
            are familiar with any changes.
          </p>
          <p className="font-bold text-lg">
            COLLECTING AND PROCESSING OF PERSONAL INFORMATION
          </p>
          <p>
            The Company endeavours that all Personal Information that is
            collected from you is, held and used in accordance with applicable
            laws and regulations of India. The Company will, subject to the laws
            applicable to you, require you to give your express consent
            signifying your agreement to the processing of Personal Information
            relating to you unless where express consent is not required. The
            Company will not collect or use your Personal Information where you
            have not expressed your consent for the same. The Company may use
            and process your Personal Information, for a number of lawful
            purposes in connection with our business, including but not limited
            to the following:
          </p>
          <p className="font-bold text-lg">Collection of Personal Data</p>
          <ul className="list-disc list-outside">
            <li>To register you as a new customer</li>
            <li>To process your order of products/services</li>
            <li>
              Enable your access to and use of the services of the Website
            </li>
            <li>To update your account related records</li>
            <li>Processing becomes necessary in the public interest</li>
            <li>To manage our relationship with you</li>
          </ul>
          <p className="font-bold text-lg">
            Sending you information pertaining to your account
          </p>
          <ul className="list-disc list-outside">
            <li>Providing you with products/services requested</li>
            <li>To update your account related records</li>
            <li>To verify your identity</li>
          </ul>
          <p className="font-bold text-lg">
            Recording of Personal Data and analysing any communications between
            you and us including phone calls
          </p>
          <ul className="list-disc list-outside">
            <li>To meet our obligations under our contract with you</li>
            <li>
              To meet regulatory requirements and other legal & statutory
              provisions
            </li>
            <li>
              To personalize website(s) of the Company and its affiliates for
              you
            </li>
            <li>To collect payments from you</li>
            <li>To provide the best customer experience</li>
            <li>
              To assess our services to customers, for training and enhancing
              customer service
            </li>
            <li>
              To carry out customer analytics and deliver customized content
            </li>
            <li>To carry out client screening/profiling</li>
          </ul>

          <p className="font-bold text-lg">Organising, structuring & storing of Personal Data</p>
            <ul className="list-disc list-outside">
               <li>To meet our obligations under our contract with you</li>
               <li>To customize our service offerings</li>
            </ul>
          <p className="font-bold text-lg">Disclosure of your Personal Information to Indian tax authorities, RBI and other statutory and Governmental authorities and Indian and overseas regulators and authorities</p>
          <ul className="list-disc list-outside">
            <li>Where the applicable law requires this to be done</li>
          </ul>
          <p className="font-bold text-lg">Retention of Personal Data</p>
          <ul className="list-disc list-outside">
            <li>Till such time as our contract with you comes to an end, or to fulfil the relevant purposes mentioned herein; or To meet regulatory requirements</li>
          </ul>
          <p className="font-bold text-lg">CONSENT AND WITHDRAWAL OF CONSENT</p>
          <p>The Company may obtain your consent (which includes consent in electronic form) as per the applicable laws before collecting Personal Information for contacting you for the purpose of providing our products and services and processing your Personal Information. You have the right at any point of time to withdraw your consent to the processing of your Personal Information by informing us in writing (which includes electronic form). However, please note that withdrawal of consent will not be retrospective in nature and shall be applicable prospectively. On withdrawal of your consent, your contract with the Company shall, subject to applicable laws, come to an end as per the terms agreed between us.</p>
          <p>You will receive promotional/marketing material from us if you have requested for the same or if you have provided your name and/or other Personal Information or if you have provided your consent as maybe required under the applicable laws, while registering for receiving marketing/promotion content and in case you have not opted out of receiving such communication. You will have the right to ‘Opt Out’ or ‘Exit’ out of receiving promotional/marketing information about our products or services.</p>
          <p>You may write to us at manivarmacfo@clubncart.com to access, review, modify or correct your Personal Information or withdraw your consent. However, we are not responsible for the authenticity of the Personal Information provided by you.</p>
          <p>
          You agree and acknowledge that requests for correction or modification of certain data or information may not be permitted under applicable law. In respect of such data or information, the above rights will not be available to be exercised.
          </p>
          <p className="font-bold text-lg">SHARING, TRANSFER, DISCLOSURE OF PERSONAL INFORMATION</p>

          <p>The Company treats your Personal Information as private and confidential and does not reveal it to any third parties except where such action is necessary to comply with legal and regulatory requirements or to protect and defend the rights of its customers.
The Company may disclose and/or transfer your Personal Information to third parties in cases it is necessary for providing services to you and/or if you have expressly consented for the same. We may share your Personal Information without obtaining your prior written consent, with government agencies mandated under the law to obtain information for the purpose of verification of identity or for prevention, detection, investigation or where disclosure is necessary for compliance of a legal obligation.
Where the Company discloses your Personal Information to its agents or sub-contractors for the purposes specified herein, the agent or sub-contractor in question will be obligated to use the Personal Information in accordance with, inter alia, the confidentiality terms and conditions contained in the agreements entered into with them. The Company or its agents and/or sub-contractors may use your Personal Information to contact you for promotion of its products/schemes etc. or those of its business partners, from time to time. You hereby agree and understand that such promotional calls shall be made to you unless you expressly convey in writing (which includes electronic form) to the Company that you should not be called further for such promotions, schemes etc. In addition to the disclosures reasonably necessary for the purposes identified herein, the Company may disclose your Personal Information to any third party to the extent that it is required to do so by law, in connection with any legal proceedings or prospective legal proceedings, and in order to establish, exercise or defend its legal rights or for service arising out of contractual obligations.</p>
          <p className="font-bold text-lg">Use of cookies</p>
          pThe Company uses cookies (i.e. text files containing small amounts of information) which are downloaded to your device in order to provide a personalised browsing experience. Cookies, among other things, allow you to navigate between pages efficiently, remember your preferences and generally improve your browsing experience. All information collected by cookies is aggregated and anonymous. By using the Company’s website, you agree that these types of cookies can be placed on your device. You are free to disable /delete the cookies by changing the browser settings. The Company is not responsible for cookies placed in your device by any other website and information collected thereto.
          <p className="font-bold text-lg">Other Websites</p>
          <p>The website contains links to other third-party websites. The Company is not responsible for the privacy policies or practices of any third party or for any third party linking the Company’s website to its website. Once you leave the Company’s website, the information provided by you will be governed by the privacy policy of the owner of the site you are visiting. You need to keep yourself informed of these privacy policies.</p>
          <p className="font-bold text-lg">Contact US</p>
          If you have any grievance about the treatment of your Personal Data / Personal Information, you may please connect with the Data Grievance Officer at:
          <p className="font-bold text-lg">By email: support@clubncart.com</p>
        </div>
      </div>
    </PrivacyPolicyWrapper>
  );
};
export default PrivacyPolicy;
