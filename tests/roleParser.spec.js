/*
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
 * the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *   https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 *
 */

import { it, describe } from 'mocha'
import { expect } from 'chai'
import organisations from './mock/organisations'
import tokenParsed from './mock/tokenParsed'
import rolesParser from '../roles/roleParser'

describe('test roleParser mapping functionality', () => {

  it('should return correct organisations based on roles', () => {

    let userOrganisations = rolesParser.getUserOrganisations(tokenParsed, organisations)
    expect(userOrganisations[0].id).to.equal(2)
    expect(userOrganisations.length).to.equal(1)
  })

})