import React from 'react';
import { Timer, Background, Foreground, Slice, createSlice, createTimer } from './Timer';

import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

describe('Component <Timer/> rendering', () => {
	describe('<Timer/>', () => {
		it('renders the timer background', () => {
			const timer = shallow(<Timer/>);
			expect(timer.find(Background)).toHaveLength(1);
		});
		it('renders the timer foreground', () => {
			const timer = shallow(<Timer/>);
			expect(timer.find(Foreground)).toHaveLength(1);
		});
		it('renders a timer slice', () => {
			const timer = shallow(<Timer/>);
			expect(timer.find(Slice)).toHaveLength(1);
		});
		it('passes percentLeft to slice when timer is not running', () => {
			const timeToPercentage = sinon.fake.returns(17.34);

			const TimerComp = createTimer(timeToPercentage);
			const timer = shallow(<TimerComp/>);
			expect(timer.find(Slice).prop('percentLeft')).toEqual(17.34);
		});
		it('passes the current time left to timeToPercentage', () => {
			const timeToPercentage = sinon.fake.returns(0);

			const TimerComp = createTimer(timeToPercentage);
			const timer = shallow(<TimerComp startMins={6} startSecs={12.5} />);
			expect(timeToPercentage.calledWith(6, 12.5)).toEqual(true);
		});
	});

	describe('<Slice/>', () => {
		it('draws the pie slice with data from circleSegment', () => {
			const circleSegment = sinon.fake.returns([12.5, 18.3]);
			const SliceComp = createSlice(circleSegment);
			const slice = shallow(<SliceComp />);

			expect(slice.find('path')).toHaveLength(1);
			expect(slice.find('path').at(0).prop('d')).toEqual('M 0 -1 A 1 1 0 0 1 12.5 18.3 L 0 0');
		});
		it('passes the current percentage to circleSegment', () => {
			const circleSegment = sinon.fake.returns([0, 0]);
			const SliceComp = createSlice(circleSegment);
			const slice = shallow(<SliceComp percentLeft={34.2} />);

			expect(circleSegment.calledWith(34.2)).toEqual(true);
		});
	});
});
