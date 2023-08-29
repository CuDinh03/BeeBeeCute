// Imports

import $ from "jquery";
import * as bootstrap from 'bootstrap';
import 'metismenu';

// Stylesheets

import './assets/base.scss';

$(document).ready(() => {

    // Sidebar Menu

    setTimeout(function () {
        $(".vertical-nav-menu").metisMenu();
    }, 100);

    // Search wrapper trigger

    $('.search-icon').click(function () {
        $(this).parent().parent().addClass('active');
    });

    $('.search-wrapper .btn-close').click(function () {
        $(this).parent().removeClass('active');
    });

    // Stop Bootstrap 5 Dropdown for closing on click inside

    $('.dropdown-menu').on('click', function (event) {
        var events = $._data(document, 'events') || {};
        events = events.click || [];
        for (var i = 0; i < events.length; i++) {
            if (events[i].selector) {

                if ($(event.target).is(events[i].selector)) {
                    events[i].handler.call(event.target, event);
                }

                $(event.target).parents(events[i].selector).each(function () {
                    events[i].handler.call(this, event);
                });
            }
        }
        event.stopPropagation(); //Always stop propagation
    });

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // BS5 Tooltips

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    $('.mobile-toggle-nav').click(function () {
        $(this).toggleClass('is-active');
        $('.app-container').toggleClass('sidebar-mobile-open');
    });

    $('.mobile-toggle-header-nav').click(function () {
        $(this).toggleClass('active');
        $('.app-header__content').toggleClass('header-mobile-open');
    });

    // Responsive

    var resizeClass = function () {
        var win = document.body.clientWidth;
        if (win < 1250) {
            $('.app-container').addClass('closed-sidebar-mobile closed-sidebar');
        } else {
            $('.app-container').removeClass('closed-sidebar-mobile closed-sidebar');
        }
    };


    $(window).on('resize', function () {
        resizeClass();
    });

    resizeClass();

});


// Import Web3.js and set up the connection
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('YOUR_KLAYTN_NODE_URL'));

// Load the smart contract ABI and address
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "instructor",
				"type": "address"
			}
		],
		"name": "CourseCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_tuitionFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maxParticipants",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_courseContent",
				"type": "string"
			}
		],
		"name": "createCourse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "courseCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "courses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "progress",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tuitionFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxParticipants",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "instructor",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "courseContent",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Truyền ABI của smart contract ở đây
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; // Địa chỉ của smart contract

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

document.addEventListener('DOMContentLoaded', () => {
    const courseForm = document.getElementById('course-form');
    courseForm.addEventListener('submit', createCourse);
});

async function createCourse(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    // Lấy các giá trị khác từ form

    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.createCourse(
            name,
            startTime,
            endTime,
            tuitionFee,
            maxParticipants,
            courseContent
        ).send({ from: accounts[0] });

        console.log('Course created:', result);

        // Cập nhật giao diện hoặc chuyển hướng đến trang khác sau khi tạo khoá học thành công
        document.getElementById('output').innerHTML = `Course created: ${result.transactionHash}`;
    } catch (error) {
        console.error('Error creating course:', error);
        document.getElementById('output').innerHTML = 'Error creating course: ' + error.message;
    }
}


